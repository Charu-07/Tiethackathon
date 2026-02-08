import React from "react";
import { useNavigate } from "react-router-dom";

export default function UserAccount() {
  const navigate = useNavigate();

  // Mock user data (replace with real auth later)
  const user = {
    name: "Charu",
    phone: "+91 9XXXXXXXXX",
    inventory: [
      { item: "Tuna", quantity: "12 kg" },
      { item: "Pomfret", quantity: "6 kg" },
      { item: "Prawns", quantity: "4 kg" },
    ],
  };

  function handleLogout() {
    // clear auth data
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h2>User Account</h2>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Name:</strong> {user.name}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Phone:</strong> {user.phone}
      </div>

      <div style={{ marginBottom: "1.5rem" }}>
        <strong>Inventory:</strong>
        <ul>
          {user.inventory.map((item, idx) => (
            <li key={idx}>
              {item.item} – {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: "0.6rem 1.2rem",
          backgroundColor: "#d7191c",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}
