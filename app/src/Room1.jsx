import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    
    /* Centering and Movement */
    transform: translate(-50%, -50%);
    transition: top 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 20;
    
    /* Hover Animation */
    animation: hover-float 2.5s ease-in-out infinite;
    
    /* Flex to center the text label */
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}

.player-name-tag {
    font-size: 0.75rem;
    font-weight: bold;
    color: white;
    pointer-events: none;
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

/* --- Left Section: Host Spotlight --- */
.host-section {
    display: flex;
    justify-content: center;
}

@media (min-width: 1024px) {
    .host-section {
        justify-content: flex-end;
    }
}

.spotlight-wrapper {
    position: relative;
    cursor: pointer;
}



.host-image-container {
    width: 300px; 
    height: 400px;
    background: rgba(0,0,0,0.2);
}

/* --- Right Section: Player Network --- */
.network-section {
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 20rem;
    max-width: 28rem;
    margin: 0 auto;
}

@media (min-width: 1024px) {
    .network-section {
        justify-content: flex-start;
        margin: 0;
    }
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

.avatar-circle {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    border: 4px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
    .avatar-circle {
        width: 5rem;
        height: 5rem;
    }
}

.avatar-circle:hover {
    transform: scale(1.1);
    filter: brightness(1.3);
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px currentColor, 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

.avatar-icon {
    width: 2rem;
    height: 2rem;
    color: white;
}

@media (min-width: 768px) {
    .avatar-icon {
        width: 2.5rem;
        height: 2.5rem;
    }
}

.player-label {
    color: #d1d5db;
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
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

const UserIcon = () => (
    <svg className="avatar-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const PlayerNode = ({ id, label, position, color, onClick, fullCharData }) => (
    // We pass fullCharData back to the click handler so we know where to move
    <div className="node-position" style={{ ...position, animationDelay: `${id * 150}ms` }} onClick={() => onClick(fullCharData)}>
        <div className="player-node">
            <div className="avatar-circle" style={{ backgroundColor: color }}>
                <UserIcon />
            </div>
            <span className="player-label">{label}</span>
        </div>
    </div>
);

function Room1() {
    const navigate = useNavigate();

    // Initial position of the "Player" (Center of the network area)
    const [playerPos, setPlayerPos] = useState({ top: '50%', left: '-180%' });

    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        return () => document.head.removeChild(styleSheet);
    }, []);

    const characters = [
        { id: 1, label: 'Raileygh', position: { top: '20%', left: '25%' }, color: '#7c3aed' },
        { id: 2, label: 'Luffy', position: { top: '55%', left: '75%' }, color: '#db2777' },
        { id: 3, label: 'Zoro', position: { top: '85%', left: '40%' }, color: '#ea580c' },
    ];

    const handleNodeClick = (character) => {
        // 1. Move the Blue Player Circle
        // We use calc() to keep the original percentage but add 5rem (approx 80px) to the right
        setPlayerPos({
            top: character.position.top,
            left: `calc(${character.position.left} + 5rem)`
        });

        // 2. Wait for the movement animation (0.8s) before redirecting
        setTimeout(() => {
            navigate(`/character/${character.id}`);
        }, 1000);
    };

    return (
        <div className="nerd-zone-container">
            <div className="layout-grid">
                <div className="host-section">
                </div>

                <div className="network-section">

                    {/* The Blue Player Circle */}
                    <div className="main-player" style={{ top: playerPos.top, left: playerPos.left }}>
                        <span className="player-name-tag"></span>
                    </div>

                    <div className="nodes-container">
                        {characters.map(char => (
                            <PlayerNode
                                key={char.id}
                                {...char}
                                fullCharData={char}
                                onClick={handleNodeClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Room1;