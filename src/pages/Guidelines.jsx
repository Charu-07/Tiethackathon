import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/guidelines.css";

const Guidelines = () => {
  return (
    <div className="guidelines-page">
      
      {/* Navbar - Dark Version */}
      

      {/* Main Content */}
      <div className="section-underwater">
        <div className="content-wrapper">

          {/* Header Box - Teal Glass */}
          <div className="guidelines-header">
            <h1>Guidelines</h1>
            <p>Adhering to these guidelines ensures the longevity of our ocean's ecosystems and the safety of your crew.</p>
          </div>

          {/* Cards - Teal Glass */}
          <div className="cards-wrapper">
            
            {/* Card 1 */}
            <div className="guide-card">
              <h2>Sustainable practices</h2>
              {/* Ensure you have this image in public folder */}
              <img src="/icon-recycle.png" alt="Sustainable" className="card-icon" />
              <p>
                Ensure that all fishing nets strictly comply with locally approved mesh size regulations to minimize bycatch and prevent the unintentional capture of juvenile and non-target species. Regularly inspect and maintain nets to ensure continued compliance with regulatory standards. Additionally, implement the practice of rotating fishing zones on a planned basis.
              </p>
            </div>

            {/* Card 2 */}
            <div className="guide-card">
              <h2>Seasonal Restrictions</h2>
              <img src="/icon-calendar.png" alt="Calendar" className="card-icon" />
              <p>
                Fishing for Bluefin Tuna is strictly prohibited from June to August in Zone A to safeguard the species during its critical breeding period and support sustainable fish populations. Compliance with this seasonal restriction is mandatory for all fishing activities in the designated zone.
              </p>
            </div>

            {/* Card 3 */}
            <div className="guide-card">
              <h2>Safety Protocols</h2>
              <img src="/icon-safety.png" alt="Safety" className="card-icon" />
              <p>
                Always check current and forecasted weather conditions from reliable sources before departure to ensure safe navigation and to avoid rough seas, storms, or sudden weather changes. Confirm that all life jackets and essential safety equipment are inspected at least once every month.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="section-info">
        <div className="content-wrapper split-layout">

          {/* Protected Area Card */}
          <div className="guide-card">
            <h2>Protected Marine Areas</h2>
            <img src="/icon-shield.png" alt="Shield" className="card-icon" />
            <p>
              Zone C is currently designated as a Marine Protected Area (MPA) to conserve marine biodiversity. Commercial fishing activities are strictly prohibited within a 5-nautical-mile radius of the Coral Reef markers to prevent habitat damage.
            </p>
          </div>

          {/* Right Info Box */}
          <div className="info-right">
            <h1 className="big-heading">Follow the guidelines, Protect the ocean, Ensure safety at sea.</h1>
            <div className="incident-box">
              <h2>Need to report an incident?</h2>
              <p>Contact the Maritime Authority immediately.</p>
              <button className="btn-emergency">Call Emergency Support</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Guidelines;