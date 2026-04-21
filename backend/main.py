import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from fastapi.staticfiles import StaticFiles


class Word(BaseModel):
    name: str

class Words(BaseModel):
    words: List[Word]

app = FastAPI()

# Serve all React build files (JS, CSS, images, favicon, index.html)
app.mount("/", StaticFiles(directory="frontend/build", html=True), name="static")

# define React frontend URL
origins = [ 
    "http://localhost:3000"
]

# CORS = Cross-Origin Resource Sharing. prohibits unauthorized servers etc. from accessing your API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {"words": []}

@app.get("/words", response_model=Words) # convert python object Word to JSON and send it to the frontend
def get_words():
    return Words(words=memory_db["words"]) # return instance of Words class

@app.post("/words", response_model=Word)
def add_word(word: Word):
    memory_db["words"].append(word) # add the new word to the in-memory database
    return word

# testing API with uvicorn (ASGI server for Python)
if __name__ == "__main__":
    thePort = int(os.environ.get("PORT", 8000)) # defaults to 8000 if it does not find Herokus dynamic port 
    uvicorn.run(app, host="0.0.0.0", port=thePort)