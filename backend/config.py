from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    
    OPENAI_API_KEY: str
    LLM_MODEL_NAME: str
    POLYGON_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()
