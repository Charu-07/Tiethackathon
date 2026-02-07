import React from 'react';
import './contact.css';
// import './dashboard.css'; // Uncomment if you have these files
// import './style.css'; 

const Contact = () => {
  return (
    <div className="contact-page-wrapper">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-left">
          <img src="fish-icon.svg" alt="Logo" className="nav-logo" />
          <span className="nav-title">SAGAR SAARTHI</span>
        </div>

        <div className="nav-center">
          <a href="/dashboard" className="nav-link">Dashboard</a>
          <a href="/sell" className="nav-link">Sell fishes</a>
          <a href="/vessel" className="nav-link">Generate Strategy</a>
          <a href="/guidelines" className="nav-link">Guidelines</a>
          <a href="/fish-info" className="nav-link">Fish Info</a>
          <a href="/contact" className="nav-link active">Contact us</a>
        </div>

        <div className="nav-right">
          <img src="profile.png" alt="Profile" className="profile-pic" />
        </div>
      </nav>

      {/* Contact Content */}
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