from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List
from app.agent import agent_run
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import uvicorn
from fastapi.responses import FileResponse


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    question: str


# app.mount("/static", StaticFiles(directory="build/static"), name="static")

# @app.get("/")
# async def read_index():
#     return FileResponse("build/index.html")

@app.post("/chat")
async def create_message(message: ChatRequest):
    question = message.question
    summary, analyze_data = agent_run(question = question)

    return JSONResponse(content={"summary":summary, "analyze_data":analyze_data})


