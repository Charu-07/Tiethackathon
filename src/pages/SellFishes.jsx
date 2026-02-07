import { useEffect, useState } from "react";
import vendors from "../data/vendors";

export default function SellFishes() {
    const [inventory, setInventory] = useState({});
    const [selectedFish, setSelectedFish] = useState("");
    const [quantity, setQuantity] = useState("");
    const [matchedVendors, setMatchedVendors] = useState([]);

    /* 🔹 Fetch user catches on page load */
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
                    aggregated[catchItem.species] =
                        (aggregated[catchItem.species] || 0) + catchItem.weight;
                });
                setInventory(aggregated);
            });
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        const results = vendors
            .filter(v => v.supportedSpecies.includes(selectedFish))
            .map(v => ({
                ...v,
                totalAmount: v.pricePerKg * quantity,
            }))
            .sort((a, b) => b.totalAmount - a.totalAmount);

        setMatchedVendors(results);
    }
    function handleSell(vendor) {
        const qty = Number(quantity);

        // Safety check
        if (!selectedFish || qty <= 0) return;

        // 1️⃣ Deduct inventory
        setInventory(prev => {
            const updated = { ...prev };
            updated[selectedFish] = updated[selectedFish] - qty;

            // Remove fish if quantity becomes 0
            if (updated[selectedFish] <= 0) {
                delete updated[selectedFish];
                setSelectedFish("");
                setQuantity("");
                setMatchedVendors([]);
            }

            return updated;
        });

        // 2️⃣ Clear vendor list after sale
        setMatchedVendors([]);

        // 3️⃣ Feedback
        alert(
            `Sold ${qty} kg of ${selectedFish} to ${vendor.name} for ₹${vendor.totalAmount}`
        );
    }


    return (
        <div style={{ paddingTop: "50vh", padding: "99px" }}>
            <h2>Sell Fishes</h2>

            {/* FORM ONLY */}
            <form onSubmit={handleSubmit} className="sell-form">
                <select
                    value={selectedFish}
                    onChange={e => setSelectedFish(e.target.value)}
                    required
                >
                    <option value="">Select Fish</option>
                    {Object.keys(inventory).map(fish => (
                        <option key={fish} value={fish}>
                            {fish} (Available: {inventory[fish]} kg)
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    max={inventory[selectedFish]}
                    placeholder="Quantity (kg)"
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    required
                />

                <button type="submit">Find Vendors</button>
            </form>

            {/* VENDOR LIST (AFTER SUBMIT ONLY) */}
            {matchedVendors.length > 0 && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Available Vendors</h3>

                    {matchedVendors.map(v => (
                        <div key={v.id} className="vendor-card">
                            <h4>{v.name}</h4>
                            <p>Price: ₹{v.pricePerKg} / kg</p>
                            <p>Distance: {v.distanceKm} km</p>
                            <p>
                                <b>Total: ₹{v.totalAmount}</b>
                            </p>

                            <button onClick={() => handleSell(v)}>
                                Sell
                            </button>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
