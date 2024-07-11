from typing import Callable, Type
from langchain_core.tools import StructuredTool
from pydantic.v1 import BaseModel, Field
from app.stock import fetch_price_data

# This is the tool for getting stock price data using polygon.io api

class StockPriceToolSchema(BaseModel):
    last_year: int = Field(description="the count of the last years which want to get stock price")


def stock_price_tool():
    return StructuredTool.from_function(
        name="fetch_stock_price",
        description="useful when user require the last stock price",
        func=fetch_price_data,
        args_schema=StockPriceToolSchema,
        infer_schema=True,
        verbose=True,
        handle_tool_error=True,
        handle_validation_error=True,
    )
