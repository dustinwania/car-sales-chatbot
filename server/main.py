from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import os

# Base directory setup
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

# Load first CSV (car_sales_data)
sales_csv_path = os.path.join(DATA_DIR, "car_sales_data.csv")
data = pd.read_csv(sales_csv_path)
data.columns = data.columns.str.strip()
data["full_name"] = (data["Manufacturer"] + " " + data["Model"]).str.lower()

# Load second CSV (car_prices_data)
prices_csv_path = os.path.join(DATA_DIR, "car_prices_data.csv")
prices_data = pd.read_csv(prices_csv_path)
prices_data.columns = prices_data.columns.str.strip()
prices_data["full_name"] = (prices_data["Manufacturer"] + " " + prices_data["Model"]).str.lower()

# FastAPI app
app = FastAPI()

# Allow frontend (Next.js) access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://car-sales-chatbot.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model for incoming data
class Question(BaseModel):
    question: str

@app.post("/ask")
def ask_car_bot(q: Question):
    try:
        question_text = q.question.lower().strip()
        results = []

        # Search both datasets
        matches_main = data[data["full_name"].str.contains(question_text, na=False)]
        matches_prices = prices_data[prices_data["full_name"].str.contains(question_text, na=False)]

        # From car_sales_data.csv
        for _, car in matches_main.head(6).iterrows():
            results.append({
                "manufacturer": car["Manufacturer"],
                "model": car["Model"],
                "year": car["Year"],
                "fuel": car["Fuel type"],
                "engine": car["Engine size"],
                "mileage": car["Mileage"],
                "price": round(car["Price"] * 80, 2),
                "source": "car_sales_data"
            })

        # From car_prices_data.csv
        for _, car in matches_prices.head(6).iterrows():
            results.append({
                "manufacturer": car["Manufacturer"],
                "model": car["Model"],
                "year": car["Year"],
                "fuel": "N/A",
                "engine": "N/A",
                "mileage": car["Mileage"],
                "price": round(car["Price"] * 70, 2),
                "condition": car.get("Condition", "Unknown"),
                "source": "car_prices_data"
            })

        if not results:
            return {"reply": [], "message": "Sorry, I couldn't find that car in any dataset."}

        return {"reply": results, "message": "Here are the cars I found:"}

    except Exception as e:
        return {"error": str(e)}
