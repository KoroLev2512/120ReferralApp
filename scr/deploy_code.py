import asyncio
import time

from pytoniq import LiteClient, LiteBalancer, Contract, WalletV4R2

from pytoniq_core import TlbScheme, Address, Cell, begin_cell, Slice, StateInit

from contracts_boc import collection_code, item_code
from config import MNEMONIC
from liteserver import LITESERVER
from get_methods import get_nft_data, get_nft_flag_params, get_collection_data


class RoyaltyParams(TlbScheme):

    def __init__(self, royalty_factor: int, royalty_base: int, royalty_address: Address):
        self.royalty_factor = royalty_factor
        self.royalty_base = royalty_base
        self.royalty_address = royalty_address

    def serialize(self, *args) -> Cell:
        return begin_cell().store_uint(self.royalty_factor, 16).store_uint(self.royalty_base, 16).store_address(self.royalty_address).end_cell()

    @classmethod
    def deserialize(cls, cell_slice: Slice):
        return cls(cell_slice.load_uint(16), cell_slice.load_uint(16), cell_slice.load_address())


class NftCollectionData(TlbScheme):

    def __init__(self, owner_address: Address, next_item_index: int, mint_flag: int, content: Cell, nft_item_code: Cell, royalty_params: RoyaltyParams):
        self.owner_address = owner_address
        self.next_item_index = next_item_index
        self.mint_flag = mint_flag
        self.content = content
        self.nft_item_code = nft_item_code
        self.royalty_params = royalty_params

    def serialize(self, *args):
        return begin_cell().store_address(self.owner_address).store_uint(self.next_item_index, 64).store_int(self.mint_flag, 8).store_ref(self.content).store_ref(self.nft_item_code).store_ref(self.royalty_params.serialize()).end_cell()

    @classmethod
    def deserialize(cls, cell_slice: Slice):
        return cls(cell_slice.load_address(), cell_slice.load_uint(64), cell_slice.load_int(8), cell_slice.load_ref(), cell_slice.load_ref(), RoyaltyParams.deserialize(cell_slice.load_ref().begin_parse()))


async def get_collection(client: LiteClient):
    collection_metadata = (begin_cell()
                           .store_uint(1, 8)
                           .store_snake_string('https://120block.ru/nft/supporter/meta/collection.json') # надо добавить
                           .end_cell())

    common_content = begin_cell().store_snake_string(
        'https://120block.ru/nft/supporter/meta/').end_cell() # надо добавить

    content = begin_cell().store_ref(collection_metadata).store_ref(common_content).end_cell()

    data_cell = NftCollectionData(
        owner_address=Address(""),
        next_item_index=0,
        mint_flag=-1,
        content=content,
        nft_item_code=item_code,
        royalty_params=RoyaltyParams(120, 1000, Address(""))

    )

    state_init = StateInit(
        code=collection_code,
        data=data_cell.serialize()
    )
    return await Contract.from_state_init(client, 0, state_init=state_init)


async def get_wallet(client):
    return await WalletV4R2.from_mnemonic(client, MNEMONIC)


async def deploy_collection(client: LiteClient):
    collection = await get_collection(client)
    wallet = await get_wallet(client)

    await wallet.transfer(
        destination=collection.address,
        state_init=collection.state_init,
        amount=5 * 10 ** 7
    )


async def deploy_item(client: LiteClient, owner: Address, index: int):

    nft_content = begin_cell().store_string('item.json').end_cell()
    nft_message = begin_cell().store_address(owner).store_ref(nft_content).end_cell()

    body = (begin_cell()
            .store_uint(1, 32)
            .store_uint(0, 64)
            .store_uint(index, 64)
            .store_coins(5 * 10**7) # 0.05 ton
            .store_ref(nft_message)
            .end_cell())

    # collection = await get_collection(client)
    wallet = await get_wallet(client)

    await wallet.transfer(
        destination="",
        amount=1 * 10 ** 7,
        body=body
    )

async def withdraw_all_ton(client: LiteClient):

    body = (begin_cell()
            .store_uint(5, 32)
            .store_uint(0, 64)
            .end_cell())

    collection = await get_collection(client)
    wallet = await get_wallet(client)

    await wallet.transfer(
        destination=collection.address,
        amount=1 * 10 ** 7,
        body=body
    )

async def change_metadata(client: LiteClient):

    collection_metadata = (begin_cell()
                           .store_uint(1, 8)
                           .store_snake_string('https://120block.ru/nft/supporter/meta/collection.json')
                           .end_cell())

    common_content = begin_cell().store_snake_string('https://120block.ru/nft/supporter/meta/').end_cell()

    content = begin_cell().store_ref(collection_metadata).store_ref(
        common_content).end_cell()

    royalty = begin_cell().store_uint(121, 16).store_uint(1000, 16).store_address("EQB_t2d1IV6KtLiif9QjGfsdOoR1ZvP1tUpwfhGITVPJK-uV").end_cell()

    body = (begin_cell()
            .store_uint(4, 32)
            .store_uint(0, 64)
            .store_ref(content)
            .store_ref(royalty)
            .end_cell())
    wallet = await get_wallet(client)

    await wallet.transfer(
        destination=Address("EQBkdWC4VbajrOhEH_8G7dMqtADyH0R4vW-9AS9kA3scQo5y"),
        amount=1 * 10**8,
        body=body
    )

async def main():
    client = LiteBalancer.from_config(config=LITESERVER)

    await client.start_up()
    wallet = await get_wallet(client)

    current_seqno = await wallet.get_seqno()
    # await change_metadata(client)
    # тут вызов функции
    await deploy_item(client, Address("UQAj7iNlsYm1GskJZV4iGWdeJKp3COxyG0x4kLB-IKGBmy2w"), index=1)
    while current_seqno == await wallet.get_seqno():
        time.sleep(2)
        print("waiting for transaction to confirm...")
    print("transaction confirmed!")

    await client.close()


asyncio.run(main())