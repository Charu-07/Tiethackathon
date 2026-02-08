import React, { useState } from "react";
import { Link } from "react-router-dom"; // IMPORTED Link for the navbar
import "../styles/fish-info.css"; 
// import "../styles/dashboard.css"; 

const FishInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [flippedCards, setFlippedCards] = useState({});

  // --- 1. THE DATASET ---
  const fishData = [
    { name: "Anchovy", tMin: 25, tMax: 30, tOpt: 27, oxy: 5.0, pol: 30, bStart: 4, bEnd: 7, icon: "🐟" },
    { name: "Barracuda", tMin: 23, tMax: 28, tOpt: 25, oxy: 5.8, pol: 45, bStart: 5, bEnd: 9, icon: "🐠" },
    { name: "Black Pomfret", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.6, pol: 35, bStart: 6, bEnd: 9, icon: "🐟" },
    { name: "Bonito", tMin: 22, tMax: 27, tOpt: 25, oxy: 5.8, pol: 45, bStart: 5, bEnd: 8, icon: "🐟" },
    { name: "Butterfish", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.4, pol: 35, bStart: 6, bEnd: 9, icon: "🐠" },
    { name: "Marine Catfish", tMin: 25, tMax: 31, tOpt: 28, oxy: 5.0, pol: 50, bStart: 6, bEnd: 10, icon: "🐟" },
    { name: "Croaker", tMin: 23, tMax: 29, tOpt: 26, oxy: 5.3, pol: 45, bStart: 5, bEnd: 9, icon: "🐟" },
    { name: "Goatfish", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.2, pol: 40, bStart: 5, bEnd: 9, icon: "🐠" },
    { name: "Groupers", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.5, pol: 40, bStart: 6, bEnd: 9, icon: "🐟" },
    { name: "Hilsa", tMin: 23, tMax: 29, tOpt: 26, oxy: 5.2, pol: 30, bStart: 6, bEnd: 10, icon: "🐟" },
    { name: "Indian Salmon", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.6, pol: 40, bStart: 5, bEnd: 9, icon: "🐟" },
    { name: "King Mackerel", tMin: 22, tMax: 27, tOpt: 25, oxy: 5.8, pol: 45, bStart: 5, bEnd: 8, icon: "🐟" },
    { name: "Lizardfish", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.1, pol: 40, bStart: 5, bEnd: 9, icon: "🦎" },
    { name: "Mackerel", tMin: 23, tMax: 27, tOpt: 25, oxy: 5.2, pol: 40, bStart: 7, bEnd: 9, icon: "🐟" },
    { name: "Needlefish", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.3, pol: 40, bStart: 5, bEnd: 9, icon: "🐟" },
    { name: "Ponyfish", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.0, pol: 35, bStart: 5, bEnd: 9, icon: "🐴" },
    { name: "Pomfret", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.8, pol: 35, bStart: 6, bEnd: 9, icon: "🐟" },
    { name: "Queenfish", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.6, pol: 45, bStart: 5, bEnd: 9, icon: "👑" },
    { name: "Red Snapper", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.5, pol: 40, bStart: 5, bEnd: 9, icon: "🐠" },
    { name: "Reef Cod", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.5, pol: 40, bStart: 6, bEnd: 9, icon: "🐟" },
    { name: "Ribbon Fish", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.0, pol: 45, bStart: 6, bEnd: 9, icon: "🐍" },
    { name: "Sardine", tMin: 24, tMax: 28, tOpt: 26, oxy: 5.5, pol: 35, bStart: 6, bEnd: 8, icon: "🐟" },
    { name: "Scad", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.5, pol: 40, bStart: 5, bEnd: 9, icon: "🐟" },
    { name: "Seer Fish", tMin: 22, tMax: 27, tOpt: 24, oxy: 6.0, pol: 45, bStart: 4, bEnd: 7, icon: "🐟" },
    { name: "Silver Belly", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.1, pol: 35, bStart: 5, bEnd: 8, icon: "🐟" },
    { name: "Silver Pomfret", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.6, pol: 35, bStart: 6, bEnd: 9, icon: "🐟" },
    { name: "Skipjack Tuna", tMin: 21, tMax: 27, tOpt: 25, oxy: 6.0, pol: 50, bStart: 5, bEnd: 7, icon: "🦈" },
    { name: "Snapper", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.4, pol: 40, bStart: 5, bEnd: 9, icon: "🐠" },
    { name: "Sole Fish", tMin: 24, tMax: 29, tOpt: 26, oxy: 5.0, pol: 40, bStart: 6, bEnd: 9, icon: "🐟" },
    { name: "Spanish Mackerel", tMin: 23, tMax: 28, tOpt: 26, oxy: 5.6, pol: 40, bStart: 5, bEnd: 8, icon: "🐟" },
    { name: "Threadfin Bream", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.2, pol: 40, bStart: 5, bEnd: 8, icon: "🐟" },
    { name: "Trevally", tMin: 24, tMax: 30, tOpt: 27, oxy: 5.6, pol: 45, bStart: 5, bEnd: 9, icon: "🐟" },
    { name: "Tuna", tMin: 20, tMax: 26, tOpt: 24, oxy: 6.0, pol: 50, bStart: 5, bEnd: 7, icon: "🦈" },
    { name: "Yellowfin Tuna", tMin: 20, tMax: 26, tOpt: 24, oxy: 6.0, pol: 50, bStart: 5, bEnd: 7, icon: "🦈" }
  ];

  const monthMap = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Toggle flip state for a specific fish
  const toggleFlip = (fishName) => {
    setFlippedCards((prev) => ({
      ...prev,
      [fishName]: !prev[fishName],
    }));
  };

  // Filter the list based on search term
  const filteredFish = fishData.filter((fish) =>
    fish.name.toUpperCase().includes(searchTerm.toUpperCase())
  );

  return (
    <>
      {/* === NAVBAR SECTION === */}
      

      <div className="fish-container">
        {/* HEADER SECTION */}
        <div className="fish-header">
          <div>
            <h1>Marine Species Database</h1>
            <p>Real-time environmental requirements and breeding data.</p>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search species (e.g. Tuna)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>

        {/* FISH GRID */}
        <div className="fish-grid">
          {filteredFish.map((fish) => {
            // Determine Badge Text based on Pollution Tolerance
            let badgeText = "Moderate";
            if (fish.pol < 40) badgeText = "Sensitive";
            else if (fish.pol >= 50) badgeText = "Hardy";

            const isFlipped = flippedCards[fish.name];

            return (
              <div
                key={fish.name}
                className={`fish-card ${isFlipped ? "flipped" : ""}`}
              >
                <div className="fish-card-inner">
                  
                  {/* === FRONT SIDE === */}
                  <div className="fish-card-front">
                    <div className="fish-image-placeholder">{fish.icon}</div>
                    
                    <div className="card-content">
                      <div className="card-top">
                        <h3>{fish.name}</h3>
                        <span className="price-tag">{badgeText}</span>
                      </div>
                      
                      <p className="sci-name">Pollution Tolerance: {fish.pol}/100</p>
                      
                      <div className="stats-row">
                        <div className="stat">
                          <span className="label">Optimal Temp</span>
                          <span className="value">{fish.tOpt}°C</span>
                        </div>
                        <div className="stat">
                          <span className="label">Oxygen Req</span>
                          <span className="value">{fish.oxy} mg/L</span>
                        </div>
                      </div>

                      <button
                        className="btn-details"
                        onClick={() => toggleFlip(fish.name)}
                      >
                        View Viability Data
                      </button>
                    </div>
                  </div>

                  {/* === BACK SIDE === */}
                  <div className="fish-card-back">
                    <h3>Viability Data</h3>
                    
                    <div className="detail-item">
                      <strong>Temperature Range</strong>
                      <span>{fish.tMin}°C - {fish.tMax}°C</span>
                    </div>

                    <div className="detail-item">
                      <strong>Minimum Oxygen</strong>
                      <span>{fish.oxy} mg/L</span>
                      {/* Visual Bar for Oxygen */}
                      <div style={{ 
                          width: "100%", 
                          background: "#e2e8f0", 
                          height: "8px", 
                          borderRadius: "4px",
                          marginTop: "5px" 
                      }}>
                          <div style={{ 
                              width: `${fish.oxy * 10}%`, 
                              background: "#3b82f6", 
                              height: "100%", 
                              borderRadius: "4px" 
                          }}></div>
                      </div>
                    </div>

                    <div className="detail-item">
                      <strong>Breeding Season</strong>
                      <span>{monthMap[fish.bStart]} - {monthMap[fish.bEnd]}</span>
                    </div>

                    <button
                      className="btn-flip-back"
                      onClick={() => toggleFlip(fish.name)}
                    >
                      Back to Card
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FishInfo;