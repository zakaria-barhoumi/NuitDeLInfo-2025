// src/components/CharacterDisplay.jsx
import React from 'react';
import './characterDisplay.css'; // We will update the CSS file name below

const CharacterDisplay = ({ image, text, name }) => {
    return (
        <div className="character-page-container">
            <img
                src={image}
                alt={name}
                className="character-img"
            />

            <div className="speech-bubble">
                {/* Optional: Display the name in bold before the text */}
                <strong>{name}:</strong><br/>
                {text}
            </div>
        </div>
    );
};

export default CharacterDisplay;