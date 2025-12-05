// src/components/CharacterDisplay.jsx
import React from 'react';
import './characterDisplay.css';

// Added 'children' prop to accept the buttons
const CharacterDisplay = ({ image, text, name, children }) => {
    return (
        <div className="character-page-container">
            <img
                src={image}
                alt={name}
                className="character-img"
            />

            <div className="speech-bubble">
                <div className="bubble-text">
                    <strong>{name}:</strong><br/>
                    {text}
                </div>

                {/* The buttons will be injected here, right inside the bubble */}
                {children}
            </div>
        </div>
    );
};

export default CharacterDisplay;