from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import os
from fastapi.middleware.cors import CORSMiddleware

# Load CSV safely
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
csv_path = os.path.join(BASE_DIR, "..", "data", "car_sales_data.csv")
data = pd.read_csv(csv_path)

# Remove spaces in column names just in case
data.columns = data.columns.str.strip()

# Create a full name column for searching
data['full_name'] = (data['Manufacturer'] + " " + data['Model']).str.lower()

app = FastAPI()

# Allow requests from Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Question(BaseModel):
    question: str

@app.post("/ask")
def ask_car_bot(q: Question):
    try:
        question_text = q.question.lower()
        matches = data[data['full_name'].str.contains(question_text)]

        if matches.empty:
            return {"reply": [], "message": "Sorry, I don't have info on that car."}

        results = []
        for _, car in matches.head(5).iterrows():
            results.append({
                "manufacturer": car["Manufacturer"],
                "model": car["Model"],
                "year": car["Year of manufacture"],
                "fuel": car["Fuel type"],
                "engine": car["Engine size"],
                "mileage": car["Mileage"],
                "price": car["Price"]
            })

        return {"reply": results, "message": "Here are the cars I found:"}
    except Exception as e:
        return {"error": str(e)}
