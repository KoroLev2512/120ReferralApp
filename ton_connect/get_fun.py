import asyncio
import httpx
from pytoniq import Address
from config import API_KEY

class GetMethodsContract:
    def __init__(self, tonapi_api_key: str):
        self.client = httpx.AsyncClient(headers={'accept': 'application/json',
                                                 'Authorization': f'Bearer {tonapi_api_key}'})

    async def get_methods(self, method_name: str, address: str):
        data = await self.client.get(
            f"https://tonapi.io/v2/blockchain/accounts/{address}/methods/{method_name}")
        return data.json()['decoded']


# if __name__ == '__main__':
#     s = GetMethodsContract(API_KEY)
#     asyncio.get_event_loop().run_until_complete(s.get_methods(
#                         method_name="get_collection_data",
#                         address="EQA07bkDBjB4PvsQAdaKdCj6imnkr__monkidSR3FoVXfYh9"
#                     ))