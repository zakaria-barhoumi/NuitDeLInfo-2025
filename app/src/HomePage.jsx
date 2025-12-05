import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import hero from "./assets/anime2.gif";
import bg from "./assets/background1.jpg";

import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="home-container">

      {/* Parallax Background */}
      <div className="bg-layer" style={{ backgroundImage: `url(${bg})` }} />

      {/* Info Icon */}
      <div className="info-circle" onClick={() => setShowInfo(true)}>
        i
      </div>

      {/* Popup + Overlay */}
      {showInfo && (
        <>
          {/* Overlay derrière le popup */}
          <div className="info-overlay" onClick={() => setShowInfo(false)} />

          {/* Popup d'information */}
          <div className="info-popup fade-in">
            <h2>NIRD Village Quest</h2>
            <p>
              Welcome to the sacred village of NIRD.  
              Each mission unlocks a new temple, forest, or ancient shrine.  
              Your destiny begins here… hero.
            </p>

            <button className="close-btn" onClick={() => setShowInfo(false)}>
              Close
            </button>
          </div>
        </>
      )}

      {/* Main Card */}
      <div className="card fade-zoom">
        <h1 className="title">NIRD Village Quest</h1>
        <p className="subtitle">
          Enter the ancient shrine and begin your destiny…
        </p>

        <div className="content-row">
          <img src={hero} className="hero-img slide-left" alt="hero" />

          <button className="start-btn glow" onClick={() => navigate("/village")}>
            Start Adventure
          </button>
        </div>
      </div>
    </div>
  );
}


