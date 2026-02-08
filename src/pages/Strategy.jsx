import React, { useState } from "react";
import { Link } from "react-router-dom";
import StrategyMap from "../components/StrategyMap";
import StrategyResults from "../components/StrategyResults";
import "../styles/strategy.css";

export default function Strategy() {

  const [formData, setFormData] = useState({
    boat: "FRP Motorized Boat",
    fuel: "",
    species: "Tuna",
    homePort: ""
  });

  const [showStrategy, setShowStrategy] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [spots, setSpots] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [caughtWeight, setCaughtWeight] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  function generateStrategy(e) {
    e.preventDefault();

    if (!formData.fuel) {
      alert("Please enter fuel capacity");
      return;
    }

    const generatedSpots = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      center: [15.5 + i * 0.1, 80 + i * 0.15],
      color: "#22c55e",
    }));

    const generatedRoutes = generatedSpots.map((spot, i) => ({
      id: i,
      distance: 20 + i * 10,
      fuel: 10 + i * 4,
      catch: 40 + i * 20,
      profit: 9000 - i * 1000,
      spot,
    }));

    setSpots(generatedSpots);
    setRoutes(generatedRoutes);
    setShowStrategy(true);
  }

  async function handleAddCatch() {
    if (!caughtWeight) {
      alert("Enter caught weight");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/catches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          species: formData.species,
          weight: Number(caughtWeight),
          routeId: selectedRoute.id,
          location: {
            lat: selectedRoute.spot.center[0],
            lon: selectedRoute.spot.center[1],
          },
        }),
      });

      if (!res.ok) throw new Error("Failed to save catch");

      await res.json();
      alert("Catch logged successfully ✅");
      setCaughtWeight("");

    } catch (err) {
      console.error(err);
      alert("Error saving catch");
    }
  }

  const handleSaveConfig = () => {
    alert("Configuration Saved Locally!");
  };

  return (
    <>
      <div className="vessel-container">

        <div className="vessel-header">
          <h1>{showStrategy ? "Recommended Strategies" : "Vessel Configuration"}</h1>
          <p>
            {showStrategy
              ? `Showing optimal routes for ${formData.boat} targeting ${formData.species}`
              : "Configure vessel parameters to receive recommendations."}
          </p>
        </div>

        {!showStrategy && (
          <div className="content-split">
            <div className="form-section">
              <div className="white-card-form">
                <h2>Boat Details</h2>

                <form onSubmit={generateStrategy}>

                  <label>Vessel Type</label>
                  <select
                    name="boat"
                    value={formData.boat}
                    onChange={handleInputChange}
                  >
                    <option>FRP Motorized Boat</option>
                    <option>Mechanized Trawler</option>
                  </select>

                  <label>Fuel Capacity</label>
                  <input
                    type="number"
                    name="fuel"
                    value={formData.fuel}
                    onChange={handleInputChange}
                    required
                  />

                  <label>Home Port</label>
                  <input
                    name="homePort"
                    value={formData.homePort}
                    onChange={handleInputChange}
                  />

                  <label>Species</label>
                  <select
                    name="species"
                    value={formData.species}
                    onChange={handleInputChange}
                  >
                    <option>Tuna</option>
                    <option>Mackerel</option>
                  </select>

                  <div className="form-actions">
                    <button type="button" onClick={handleSaveConfig}>
                      Save
                    </button>
                    <button type="submit">
                      Generate Strategy
                    </button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        )}

        {showStrategy && (
          <StrategyResults
            routes={routes}
            onSelectRoute={setSelectedRoute}
          />
        )}

      </div>
    </>
  );
}
