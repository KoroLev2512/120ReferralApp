import os
from dotenv import load_dotenv

load_dotenv()

MNEMONIC = os.getenv("MNEMONIC")
API_KEY = os.getenv("API_KEY")