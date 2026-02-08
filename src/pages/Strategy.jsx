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

      const data = await res.json();
      console.log("Catch saved:", data);
      alert("Catch logged successfully ✅");
      setCaughtWeight("");
      
    } catch (err) {
      console.error(err);
      alert("Error saving catch (Check if backend is running)");
    }
  }

  const handleSaveConfig = () => {
    alert("Configuration Saved Locally!");
  };

  return (
    // FIX 1: Wrapped everything in the new class to prevent global background issues
    <div className="strategy-page-wrapper"> 
      <div className="vessel-container">
        
        <div className="vessel-header">
          <h1>{showStrategy ? "Recommended Strategies" : "Vessel Configuration"}</h1>
          <p>
            {showStrategy 
              ? `Showing optimal routes for ${formData.boat} targeting ${formData.species}`
              : "Configure your boat parameters to receive accurate fuel estimates and zone recommendations."}
          </p>
        </div>

        {!showStrategy && (
          <div className="content-split">
            <div className="form-section">
                <div className="white-card-form">
                    <h2>Boat Details</h2>
                    <p className="sub-label">Enter your vessel specifications below.</p>

                    <form onSubmit={generateStrategy}>
                        <label>Vessel Type</label>
                        <div className="input-with-icon">
                            <img src="/icon-boat.png" alt="Boat" />
                            <select 
                                name="boat"
                                value={formData.boat}
                                onChange={handleInputChange}
                            >
                                <option>FRP Motorized Boat</option>
                                <option>Motorized Wooden Boat (Country Craft)</option>
                                <option>Mechanized Gill Net Boat</option>
                                <option>Mechanized Trawler</option>
                                <option>Non-Mechanized Country Boat</option>
                            </select>
                        </div>

                        <div className="form-row">
                            <div className="half-width">
                                <label>Fuel Capacity (Litres)</label>
                                <div className="input-with-icon">
                                    <img src="/icon-fuel.png" alt="Fuel" />
                                    <input 
                                        type="number" 
                                        name="fuel"
                                        placeholder="0" 
                                        value={formData.fuel}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="half-width">
                                <label>Home Port</label>
                                <div className="input-with-icon">
                                    <img src="/icon-anchor.png" alt="Anchor" />
                                    <input 
                                        type="text" 
                                        name="homePort"
                                        placeholder="Port Name" 
                                        value={formData.homePort}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <label>Primary Target Species</label>
                        <div className="input-with-icon">
                            <img src="/icon-fish-small.png" alt="Fish" />
                            <select 
                                name="species"
                                value={formData.species}
                                onChange={handleInputChange}
                            >
                                <option>Tuna</option>
                                <option>Mackerel</option>
                                <option>Sardine</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-save" onClick={handleSaveConfig}>Save Configuration</button>
                            <button type="submit" className="btn-generate">Generate Strategy</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="image-section">
                <div className="image-placeholder">
                    <h2>Vessel image</h2>
                </div>
            </div>
          </div>
        )}

        {showStrategy && !selectedRoute && (
          <div className="strategy-view-container">
             <div className="glass-panel">
                <StrategyMap spots={spots} />
             </div>
             <div className="glass-panel">
                <StrategyResults
                    routes={routes}
                    onSelectRoute={setSelectedRoute}
                />
             </div>
             <button className="btn-back" onClick={() => setShowStrategy(false)}>← Back to Configuration</button>
          </div>
        )}

        {selectedRoute && (
           <div className="strategy-view-container">
              <div className="glass-panel">
                 <StrategyMap
                    spots={spots}
                    selectedRoute={selectedRoute}
                 />
              </div>

              <div className="glass-panel catch-panel">
                 <h3>Selected Route Details</h3>
                 <div className="route-stats">
                    <p><strong>Distance:</strong> {selectedRoute.distance} km</p>
                    <p><strong>Fuel Cost:</strong> {selectedRoute.fuel} L</p>
                    <p><strong>Expected Profit:</strong> ₹{selectedRoute.profit}</p>
                 </div>

                 <hr />

                 <h4>Log Your Catch</h4>
                 <div className="input-with-icon">
                    <img src="/icon-fish-small.png" alt="fish" />
                    <input
                        type="number"
                        placeholder="Fish caught (kg)"
                        value={caughtWeight}
                        onChange={(e) => setCaughtWeight(e.target.value)}
                    />
                 </div>
                 
                 <div className="form-actions" style={{marginTop: '20px'}}>
                    <button className="btn-save" onClick={handleAddCatch}>
                        Submit Catch Data
                    </button>
                    {/* FIX 2: Better navigation flow from the route view */}
                    <div style={{display: 'flex', gap: '10px'}}>
                        <button className="btn-generate" style={{flex: 1}} onClick={() => setSelectedRoute(null)}>
                            Back to Routes
                        </button>
                        <button className="btn-generate" style={{flex: 1}} onClick={() => { setSelectedRoute(null); setShowStrategy(false); }}>
                            Edit Config
                        </button>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}