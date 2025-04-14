from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dummy data
DATA_FILE = os.path.join(os.path.dirname(__file__), "dummyData.json")
with open(DATA_FILE, "r") as f:
    sales_data = json.load(f)

@app.get("/api/sales-reps")
def get_sales_reps():
    return sales_data["salesReps"]

# Define request model for AI endpoint
class AIRequest(BaseModel):
    question: str

@app.post("/api/ai")
def ai_response(request: AIRequest):
    question = request.question.lower()
    # Simple rule-based mock logic
    if "top" in question and "sales" in question:
        return {"response": "The top sales representative is Alice Smith with 5 successful deals."}
    elif "skills" in question:
        return {"response": "Sales reps generally have skills like negotiation, CRM, and communication."}
    else:
        return {"response": f"Sorry, I don’t understand the question: '{request.question}'"}
