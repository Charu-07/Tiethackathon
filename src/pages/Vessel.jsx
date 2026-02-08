import React from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/vessel.css'; 

const Vessel = () => {
  return (
    <>
      {/* === NAVBAR === */}
     
      {/* === VESSEL CONTENT === */}
      <div className="vessel-container">
        
        {/* Header Glass Box */}
        <div className="vessel-header">
          <h1>Vessel Configuration</h1>
          <p>Configure your boat parameters to receive accurate fuel estimates and zone recommendations.</p>
        </div>

        <div className="content-split">
            
            {/* Left Side: Form */}
            <div className="form-section">
                <div className="white-card-form">
                    <h2>Boat Details</h2>
                    <p className="sub-label">Enter your vessel specifications below.</p>

                    <form>
                        <label>Vessel Type</label>
                        <div className="input-with-icon">
                            <img src="/icon-boat.png" alt="Boat" />
                            <select defaultValue="Select Vessel Type">
                                <option disabled>Select Vessel Type</option>
                                <option>FRP Motorized Boat</option>
                                <option>Motorized Wooden Boat</option>
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
                                    <input type="number" placeholder="0" />
                                </div>
                            </div>
                            <div className="half-width">
                                <label>Home Port</label>
                                <div className="input-with-icon">
                                    <img src="/icon-anchor.png" alt="Anchor" />
                                    <input type="text" placeholder="Port Name" />
                                </div>
                            </div>
                        </div>

                        <label>Primary Target Species</label>
                        <div className="input-with-icon">
                            <img src="/icon-fish-small.png" alt="Fish" />
                            <select defaultValue="Select Species">
                                <option disabled>Select Species</option>
                                <option>Tuna</option>
                                <option>Mackerel</option>
                                <option>Sardine</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="button" className="btn-save">Save Configuration</button>
                            <button type="button" className="btn-generate">Generate Strategy</button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Right Side: Image Placeholder */}
            <div className="image-section">
                <div className="image-placeholder">
                    <h2>Vessel image</h2>
                </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default Vessel;