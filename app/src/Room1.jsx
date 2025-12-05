import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { characters as charactersData } from './characterData.js';

const styles = `
/* Global Container */
.nerd-zone-container {
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #1a0b2e 0%, #2d0f52 50%, #43126e 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-family: sans-serif;
    color: white;
    overflow: hidden;
    box-sizing: border-box;
}

/* --- THE PLAYER (Blue Circle) --- */
.main-player {
    position: absolute;
    width: 70px;
    height: 70px;
    background-color: #3b82f6; /* Blue */
    border-radius: 50%;
    border: 3px solid white;
    transform: translate(-50%, -50%);
    transition: top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 20;
    animation: hover-float 2.5s ease-in-out infinite;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

@keyframes hover-float {
    0%, 100% { transform: translate(-50%, -50%) translateY(-5px); }
    50% { transform: translate(-50%, -50%) translateY(5px); }
}

/* Main Grid Layout */
.layout-grid {
    width: 100%;
    max-width: 1400px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
}

@media (min-width: 1024px) {
    .layout-grid {
        grid-template-columns: 1fr 1fr;
    }
}

.host-section {
    display: flex;
    justify-content: center;
    height: 400px; /* Placeholder height */
}

/* --- Right Section: Player Network --- */
.network-section {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 25rem; /* Increased slightly for larger circles */
    max-width: 30rem;
    margin: 0 auto;
}

/* Nodes Container */
.nodes-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 10;
}

.node-position {
    position: absolute;
    transform: translateX(-50%);
    cursor: pointer;
}

/* Player Node Component Styles */
.player-node {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    animation: fade-in-up 0.6s ease-out backwards;
}

/* --- UPDATED AVATAR CIRCLE FOR IMAGES --- */
.avatar-circle {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    /* Important for images: hide anything outside the circle */
    overflow: hidden; 
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: 4px solid rgba(255, 255, 255, 0.1);
    background-color: #000; /* Default bg behind image */
}

@media (min-width: 768px) {
    .avatar-circle {
        width: 6rem;
        height: 6rem;
    }
}

/* --- NEW CSS FOR THE IMAGES INSIDE CIRCLES --- */
.node-image {
    width: 100%;
    height: 100%;
    /* This ensures the image fills the circle without stretching */
    object-fit: cover; 
}

/* --- UNLOCKED HOVER --- */
.avatar-circle:not(.locked):hover {
    transform: scale(1.15);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    border-color: white;
}

/* --- LOCKED STATE STYLES --- */
.avatar-circle.locked {
    background-color: #222 !important; 
    border-color: #444;
    cursor: not-allowed;
    /* If we had images in locked state, this would grayscale them:
       filter: grayscale(100%) brightness(70%); */
    box-shadow: none;
}

.player-label {
    color: #d1d5db;
    font-size: 0.875rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
    text-transform: uppercase;
}

@media (min-width: 768px) {
    .player-label {
        font-size: 1rem;
    }
}

@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;

// Lock Icon
const LockIcon = () => (
    <div style={{ fontSize: '2.5rem' }}>🔒</div>
);

// 2. UPDATED PLAYER NODE TO ACCEPT IMAGE
const PlayerNode = ({ id, label, image, position, color, onClick, isLocked }) => (
    <div
        className="node-position"
        style={{ ...position, animationDelay: `${id * 150}ms` }}
        onClick={() => onClick(id, isLocked, position)}
    >
        <div className="player-node">
            <div
                className={`avatar-circle ${isLocked ? 'locked' : ''}`}
                // We use the specific color for the border glow on hover, else grey
                style={{ borderColor: isLocked ? '#444' : color }}
            >
                {/* SHOW LOCK OR SHOW IMAGE */}
                {isLocked ? (
                    <LockIcon />
                ) : (
                    <img src={image} alt={label} className="node-image" />
                )}
            </div>
            <span className="player-label" style={{ opacity: isLocked ? 0.6 : 1 }}>
                {label}
            </span>
        </div>
    </div>
);

function Room1() {
    const navigate = useNavigate();
    // Initial position of the "Player" (Center of the network area)
    const [playerPos, setPlayerPos] = useState({ top: '50%', left: '-150%' });

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => document.head.removeChild(styleSheet);
    }, []);

    // 3. MERGE POSITION DATA WITH IMPORTED CHARACTER DATA
    // We map over your positions and grab the image/name from the imported data file
    const charactersList = [
        { id: 1, ...charactersData['1'], position: { top: '15%', left: '30%' }, color: '#ffd700' }, // Rayleigh (Gold)
        { id: 3, ...charactersData['3'], position: { top: '80%', left: '35%' }, color: '#22c55e' }, // Zoro (Green)
        { id: 2, ...charactersData['2'], position: { top: '50%', left: '80%' }, color: '#ef4444' }, // Luffy (Red)
    ];

    // Helper to check locks based on localStorage
    const isCharacterUnlocked = (id) => {
        // ID 1 (Rayleigh) is always unlocked by default
        if (String(id) === "1") return true;
        // Check local storage for others
        return localStorage.getItem(`unlocked_${id}`) === 'true';
    };

    const handleNodeClick = (id, isLocked, position) => {
        if (isLocked) {
            toast.error("🔒 Personnage verrouillé ! Finis le précédent d'abord.", {
                position: "bottom-center",
                theme: "colored",
                autoClose: 2000
            });
            return;
        }

        // Move the Blue Player Circle
        setPlayerPos({
            top: position.top,
            left: `calc(${position.left} + 4rem)`
        });

        // Wait for animation then redirect
        setTimeout(() => {
            navigate(`/character/${id}`);
        }, 1000);
    };

    return (
        <div className="nerd-zone-container">
            <div className="layout-grid">
                <div className="host-section">
                    {/* Left side placeholder */}
                </div>

                <div className="network-section">
                    {/* The Blue Player Circle */}
                    <div className="main-player" style={{ top: playerPos.top, left: playerPos.left }}>
                    </div>

                    <div className="nodes-container">
                        {charactersList.map(char => {
                            const unlocked = isCharacterUnlocked(char.id);
                            return (
                                <PlayerNode
                                    key={char.id}
                                    {...char}
                                    // image and name are now passed via {...char}
                                    isLocked={!unlocked}
                                    onClick={handleNodeClick}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room1;