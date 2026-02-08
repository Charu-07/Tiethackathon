from fastapi import FastAPI
import joblib
import numpy as np

app = FastAPI()

# Load ML model
trip_model = joblib.load("models/trip_model.pkl")

@app.get("/")
def home():
    return {"status": "ML service running"}

@app.post("/rank_routes")
def rank_routes(data: dict):

    routes = data["routes"]

    for route in routes:
        X = np.array([route["features"]])
        route["score"] = float(trip_model.predict(X)[0])

    routes.sort(key=lambda x: x["score"], reverse=True)

    return {"routes": routes}