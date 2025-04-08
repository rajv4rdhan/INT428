from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from agent import process_user_query
from starlette.middleware.cors import CORSMiddleware

# Load environment variables
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

app = FastAPI(title="Music Recommendation API", description="API for recommending music based on mood")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
# Define models
class MoodRequest(BaseModel):
    mood: str

class Song(BaseModel):
    title: str
    code: str

class SongResponse(BaseModel):
    songs: List[Song]

# API endpoints
@app.get("/")
def read_root():
    return {"message": "Welcome to the Music Recommendation API"}

@app.post("/recommend")
def recommend_music(request: MoodRequest):
    try:
            
        songs = process_user_query(request.mood)
        return {"songs": songs['output']}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)