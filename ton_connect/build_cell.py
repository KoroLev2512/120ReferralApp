from base64 import urlsafe_b64encode

from pytoniq_core import begin_cell, Address


def get_msg_body(destination_address: str, owner_address: str, nft_index: int) -> dict:
    nft_content = begin_cell().store_string(f'{5}.json').end_cell()
    nft_message = begin_cell().store_address(owner_address).store_ref(nft_content).end_cell()
    data = {
        'address': destination_address,
        'amount': str(2 * 10**9),
        'payload': urlsafe_b64encode(
                    begin_cell()
                    .store_uint(1, 32)
                    .store_uint(0, 64)
                    .store_uint(nft_index, 64)
                    .store_coins(amount=50000000)
                    .store_ref(nft_message)
                    .end_cell()
                    .to_boc()
                ).decode()
    }

    return data
