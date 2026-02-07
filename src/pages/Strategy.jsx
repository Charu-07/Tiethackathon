import { useState } from "react";
import StrategyMap from "../components/StrategyMap";
import StrategyResults from "../components/StrategyResults";

export default function Strategy() {
  const [formData, setFormData] = useState({
    boat: "small",
    fuel: "",
    species: "tuna",
  });

  const [showStrategy, setShowStrategy] = useState(false);
  const [routes, setRoutes] = useState([]);
  const [spots, setSpots] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [caughtWeight, setCaughtWeight] = useState("");

  function generateStrategy(e) {
    e.preventDefault();

    // 🔹 Simulated spots
    const generatedSpots = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      center: [15.5 + i * 0.1, 80 + i * 0.15],
      color: "#22c55e",
    }));

    // 🔹 Simulated routes (each route points to one spot)
    const generatedRoutes = generatedSpots.map((spot, i) => ({
      id: i,
      distance: 20 + i * 10,
      fuel: 10 + i * 4,
      catch: 40 + i * 20,
      profit: 9000 - i * 1000,
      spot, // 🔑 link route → map spot
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

    if (!res.ok) {
      throw new Error("Failed to save catch");
    }

    const data = await res.json();
    console.log("Catch saved:", data);

    alert("Catch logged successfully ✅");

    // optional reset
    setCaughtWeight("");
  } catch (err) {
    console.error(err);
    alert("Error saving catch");
  }
}


  return (
    <div style={{ paddingTop: "10vh", padding: "20px" }}>
      <h2>Generate Fishing Strategy</h2>

      {/* ---------- FORM ---------- */}
      {!showStrategy && (
        <form onSubmit={generateStrategy} className="strategy-form">
          <select name="boat">
            <option value="FRP Motorized Boat">FRP Motorized Boat</option>
            <option value="Motorized Wooden Boat (Country Craft)">Motorized Wooden Boat (Country Craft)</option>
            <option value="Mechanized Gill Net Boat">Mechanized Gill Net Boat</option>
            <option value="Mechanized Trawler">Mechanized Trawler</option>
            <option value="Non-Mechanized Country Boat">Non-Mechanized Country Boat</option>
          </select>

          <input
            type="number"
            placeholder="Fuel (litres)"
            required
          />

          <select>
            <option value="tuna">Tuna</option>
            <option value="mackerel">Mackerel</option>
          </select>

          <button type="submit">Generate Strategy</button>
        </form>
      )}

      {/* ---------- STRATEGY VIEW ---------- */}
      {showStrategy && !selectedRoute && (
        <>
          <StrategyMap spots={spots} />
          <StrategyResults
            routes={routes}
            onSelectRoute={setSelectedRoute}
          />
        </>
      )}

      {/* ---------- POST-SELECTION VIEW ---------- */}
      {selectedRoute && (
        <>
          <StrategyMap
            spots={spots}
            selectedRoute={selectedRoute}
          />

          <div style={{ marginTop: "20px" }}>
            <h3>Selected Route</h3>
            <p>Distance: {selectedRoute.distance} km</p>
            <p>Expected Profit: ₹{selectedRoute.profit}</p>

            <input
              type="number"
              placeholder="Fish caught (kg)"
              value={caughtWeight}
              onChange={(e) => setCaughtWeight(e.target.value)}
            />

            <button onClick={handleAddCatch}>
              Add
            </button>
          </div>
        </>
      )}
    </div>
  );
}
