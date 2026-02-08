import React from 'react';
import { Link } from 'react-router-dom'; // Imported Link for navigation
import '../styles/contact.css';
// import './dashboard.css'; 
// import './style.css'; 

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      
      {/* === Integrated Navbar === */}
      

      {/* === Contact Content === */}
      <div className="contact-container">
        
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>Have questions about zones, pricing, or safety guidelines? We are here to help.</p>
        </div>

        <div className="contact-wrapper">
          
          {/* Left Side: Info Card */}
          <div className="info-card">
            <h2>Contact Information</h2>
            <p className="subtitle">Reach out to our support team directly.</p>

            <div className="info-item">
              <div className="icon-box">📍</div>
              <div>
                <h3>Headquarters</h3>
                <p>12, Marine Drive, Mumbai, India</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">📞</div>
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="info-item">
              <div className="icon-box">✉️</div>
              <div>
                <h3>Email</h3>
                <p>support@sagarsaarthi.in</p>
              </div>
            </div>

            <div className="map-box">
              <span>Map View Loading...</span>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="form-card">
            <h2>Send a Message</h2>
            <form>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Captain Name" />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="captain@example.com" />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?"></textarea>
              </div>

              <button type="button" className="btn-send">Send Message</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;