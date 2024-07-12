import asyncio
from datetime import datetime
from base64 import urlsafe_b64encode

from pytoniq_core import begin_cell, Address
from pytonconnect import TonConnect
from pytonconnect.exceptions import UserRejectsError

from get_fun import GetMethodsContract
from build_cell import get_msg_body
from config import API_KEY

get_nft_data = GetMethodsContract(API_KEY)

async def main():
    connector = TonConnect(manifest_url='https://raw.githubusercontent.com/XaBbl4/pytonconnect/main/pytonconnect-manifest.json')

    def status_changed(wallet_info):
        print('wallet_info:', wallet_info)
        unsubscribe()

    def status_error(e):
        print('connect_error:', e)

    unsubscribe = connector.on_status_change(status_changed, status_error)

    wallets_list = connector.get_wallets()
    print('wallets_list:', wallets_list)

    generated_url = await connector.connect(wallets_list[1])
    print('generated_url:', generated_url)

    print('Waiting 2 minutes to connect...')
    for i in range(120):
        await asyncio.sleep(1)
        if connector.connected:
            if connector.account.address:
                print('Connected with address:', connector.account.address)
            break

    if connector.connected:
        index = await get_nft_data.get_methods(
            method_name="get_collection_data",
            address="EQA07bkDBjB4PvsQAdaKdCj6imnkr__monkidSR3FoVXfYh9"
        )
        transaction = {
            'valid_until': (int(datetime.now().timestamp()) + 900) * 1000,
            'messages': [
                get_msg_body(
                    destination_address="",
                    owner_address=connector.account.address,
                    nft_index=int(index['next_item_index'])
                )
            ]
        }

        try:
            result = await connector.send_transaction(transaction)
            print('Transaction was sent successfully')
            print(result)

        except Exception as e:
            if isinstance(e, UserRejectsError):
                print('You rejected the transaction')
            else:
                print('Unknown error:', e)

        print('Waiting 2 minutes to disconnect...')
        asyncio.create_task(connector.disconnect())
        for i in range(120):
            await asyncio.sleep(1)
            if not connector.connected:
                print('Disconnected')
                break


if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())