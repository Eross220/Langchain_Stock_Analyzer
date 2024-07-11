import os
import requests
from datetime import datetime, timedelta
import json
import requests
from datetime import datetime, timedelta
from config import settings


def fetch_price_data(last_year: int):
    APIurl = "https://api.polygon.io/v2/aggs/ticker/AAPL"
    start_date = datetime.today().date()  # start date is today
    if last_year is None:
        end_date = start_date - timedelta(
            days=365 * 3
        )  # end date is 3 years in the past
    else:
        end_date = start_date - timedelta(days=365 * last_year)
    API_KEY = settings.POLYGON_API_KEY
    print(end_date)
    url = f"{APIurl}/range/1/month/{end_date}/{start_date}?adjusted=true&sort=asc&limit=50000000&apiKey={API_KEY}"
    print(url)
    response = requests.get(url)

    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(f"Failed to fetch data: {response.status_code}")
        return None
