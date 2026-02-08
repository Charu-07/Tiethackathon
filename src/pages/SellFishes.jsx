import React, { useEffect, useState } from "react";
import vendors from "../data/vendors"; // Ensure this file exists in your data folder
import "../styles/sell.css"; 

export default function SellFishes() {
    // === 1. LOGIC STATE ===
    const [inventory, setInventory] = useState({});
    const [selectedFish, setSelectedFish] = useState("");
    const [quantity, setQuantity] = useState("");
    const [matchedVendors, setMatchedVendors] = useState([]);

    // === 2. FETCH INVENTORY ON LOAD ===
    useEffect(() => {
        fetch("http://localhost:5000/catches", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(res => res.json())
        .then(data => {
            const aggregated = {};
            data.forEach(catchItem => {
                // Aggregate weight by species
                aggregated[catchItem.species] = (aggregated[catchItem.species] || 0) + catchItem.weight;
            });
            setInventory(aggregated);
        })
        .catch(err => console.error("Failed to load inventory:", err));
    }, []);

    // === 3. HANDLERS ===
    
    // Find Buyers Logic
    function handleSubmit(e) {
        e.preventDefault();
        
        if (!selectedFish || !quantity) {
            alert("Please select a fish and quantity.");
            return;
        }

        const results = vendors
            .filter(v => v.supportedSpecies.includes(selectedFish))
            .map(v => ({
                ...v,
                totalAmount: v.pricePerKg * quantity,
            }))
            .sort((a, b) => b.totalAmount - a.totalAmount); // Best price first

        if (results.length === 0) {
            alert("No vendors found for this fish species.");
        }
        
        setMatchedVendors(results);
    }

    // Execute Sale Logic
    function handleSell(vendor) {
        const qty = Number(quantity);
        if (!selectedFish || qty <= 0) return;

        // 1. Deduct from local inventory
        setInventory(prev => {
            const updated = { ...prev };
            updated[selectedFish] = updated[selectedFish] - qty;

            // Cleanup if 0
            if (updated[selectedFish] <= 0) delete updated[selectedFish];
            return updated;
        });

        // 2. Reset UI
        alert(`✅ Sold ${qty} kg of ${selectedFish} to ${vendor.name} for ₹${vendor.totalAmount}`);
        setSelectedFish("");
        setQuantity("");
        setMatchedVendors([]);
    }

    // === 4. UI RENDER ===
    return (
        <div className="sell-container">
            
            {/* Header */}
            <div className="sell-header">
                <h1>Marketplace</h1>
                <p>Sell your catch directly to verified vendors at best prices.</p>
            </div>

            <div className="sell-content-split">
                
                {/* === LEFT: SELL FORM === */}
                <div className="sell-form-section">
                    <div className="glass-card-form">
                        <h2>Sell Your Catch</h2>
                        <p className="sub-label">Select from your available inventory.</p>

                        <form onSubmit={handleSubmit}>
                            
                            <label>Select Fish</label>
                            <div className="input-group">
                                <span className="icon">🐟</span>
                                <select
                                    value={selectedFish}
                                    onChange={e => {
                                        setSelectedFish(e.target.value);
                                        setMatchedVendors([]); // Clear previous results
                                    }}
                                    required
                                >
                                    <option value="">-- Choose from Inventory --</option>
                                    {Object.keys(inventory).map(fish => (
                                        <option key={fish} value={fish}>
                                            {fish} (Avail: {inventory[fish]} kg)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <label>Quantity (kg)</label>
                            <div className="input-group">
                                <span className="icon">⚖️</span>
                                <input
                                    type="number"
                                    min="1"
                                    max={inventory[selectedFish] || ""}
                                    placeholder="Enter weight"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    required
                                />
                            </div>
                            {selectedFish && (
                                <p style={{ fontSize: "12px", color: "#64748b", marginTop: "-10px", marginBottom: "20px" }}>
                                    Max sellable: {inventory[selectedFish]} kg
                                </p>
                            )}

                            <button type="submit" className="btn-submit-listing">
                                Find Buyers
                            </button>

                        </form>
                    </div>
                </div>

                {/* === RIGHT: RESULTS OR MARKET RATES === */}
                <div className="sell-info-section">
                    
                    {/* CONDITIONAL: Show Vendors if matched, otherwise show Market Rates */}
                    {matchedVendors.length > 0 ? (
                        <div className="glass-card-info">
                            <h3>🤝 Matched Vendors</h3>
                            <p style={{fontSize: "14px", color: "#475569", marginBottom: "15px"}}>
                                Found {matchedVendors.length} buyers for {quantity}kg {selectedFish}
                            </p>
                            
                            <div className="vendor-list-scroll">
                                {matchedVendors.map(v => (
                                    <div key={v.id} className="vendor-card-item">
                                        <div className="vendor-info">
                                            <h4>{v.name}</h4>
                                            <p className="dist">📍 {v.distanceKm} km away</p>
                                            <p className="rate">Rate: ₹{v.pricePerKg}/kg</p>
                                        </div>
                                        <div className="vendor-action">
                                            <span className="total-price">₹{v.totalAmount}</span>
                                            <button 
                                                className="btn-sell-action"
                                                onClick={() => handleSell(v)}
                                            >
                                                Sell
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* DEFAULT VIEW: Market Rates */
                        <div className="glass-card-info">
                            <h3>📈 Live Market Rates</h3>
                            <div className="rate-list">
                                <div className="rate-item">
                                    <span className="fish-name">Yellowfin Tuna</span>
                                    <span className="fish-price">₹ 450/kg</span>
                                    <span className="trend up">▲ 5%</span>
                                </div>
                                <div className="rate-item">
                                    <span className="fish-name">Indian Mackerel</span>
                                    <span className="fish-price">₹ 180/kg</span>
                                    <span className="trend down">▼ 2%</span>
                                </div>
                                <div className="rate-item">
                                    <span className="fish-name">Silver Pomfret</span>
                                    <span className="fish-price">₹ 800/kg</span>
                                    <span className="trend up">▲ 8%</span>
                                </div>
                                <div className="rate-item">
                                    <span className="fish-name">Sardine</span>
                                    <span className="fish-price">₹ 120/kg</span>
                                    <span className="trend stable">• 0%</span>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}