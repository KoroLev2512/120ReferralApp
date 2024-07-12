import asyncio

import requests
from pytoniq import LiteClient, Contract, WalletV4R2, RunGetMethodError

from pytoniq_core import TlbScheme, Address, Cell, begin_cell, Slice, StateInit


def parse_metadata(cs: Slice):
    if cs.preload_uint(8) == 1:
        cs.skip_bits(8)
        return requests.get(cs.load_snake_string()).json()


async def get_collection_data(client: LiteClient, address):
    data = await client.run_get_method(address=address, method='get_collection_data', stack=[])

    result = {
        'next_item_index': data[0],
        'metadata': parse_metadata(data[1].begin_parse()),
        'owner': data[2].load_address()
    }
    return result


async def get_nft_address_by_index(client: LiteClient, address, index: int):
    data = await client.run_get_method(address=address, method='get_nft_address_by_index', stack=[index])
    return data[0].load_address()


async def get_royalty_params(client: LiteClient, address: str):
    data = await client.run_get_method(address=address, method='royalty_params', stack=[])
    return {
        'royalty': data[0] / data[1] if data[1] != 0 else 0,
        'address': data[2].load_address()
    }

async def get_nft_flag_params(client: LiteClient, address):
    data = await client.run_get_method(address=address, method='flag_params', stack=[])
    return data[0]


async def get_nft_data(client: LiteClient, address: str):
    data = await client.run_get_method(address=address, method='get_nft_data', stack=[])
    return {
        'init': data[0],
        'index': data[1],
        'collection_address': data[2].load_address(),
        'owner': data[3].load_address(),
        'content': data[4]
    }


async def get_nft_content(client: LiteClient, address: str, index: int, individual_nft_content: Cell):
    data = await client.run_get_method(address=address, method='get_nft_content',
                                       stack=[index, individual_nft_content])
    cs = data[0].begin_parse()
    cs.skip_bits(8)
    return cs.load_snake_string()
