// src/VillageMap.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './VillageMap.css';

// ✅ Tes fichiers confirmés
import imgSalle1 from './assets/computer_anime.jpg';
import imgSalle2 from './assets/nuage.jpg';
import imgSalle3 from './assets/katana.jpg';
import imgSalle4 from './assets/masque.jpg';

const VillageMap = () => {
    const navigate = useNavigate();

    // --- 1. CONFIGURATION DES GRADES (Tu peux changer les noms ici !) ---
    const RANK_NAMES = [
        "RÉSISTANT",        // Niveau 1
        "INFILTRÉ",         // Niveau 2
        "CYBER-SOLDAT",     // Niveau 3
        "MAÎTRE DU CODE"    // Niveau 4
    ];

    // --- 2. INITIALISATION DES ÉTATS AVEC SAUVEGARDE (LOAD) ---
    const [level, setLevel] = useState(() => {
        const savedLevel = localStorage.getItem('playerLevel');
        return savedLevel ? parseInt(savedLevel) : 1;
    });

    const [currentXP, setCurrentXP] = useState(() => {
        const savedXP = localStorage.getItem('playerXP');
        return savedXP ? parseInt(savedXP) : 40;
    });

    const [rooms, setRooms] = useState(() => {
        const savedRooms = localStorage.getItem('playerRooms');
        if (savedRooms) {
            return JSON.parse(savedRooms);
        } else {
            return [
                { id: 1, name: "SALLE 一 • ア", mission: "Machines Oubliées", isUnlocked: true, path: "/salle1", iconSrc: imgSalle1 },
                { id: 2, name: "SALLE 一 • イ", mission: "Cloud Impérial", isUnlocked: false, path: "/salle2", iconSrc: imgSalle2 },
                { id: 3, name: "SALLE 二 • ア", mission: "Forge Communs", isUnlocked: false, path: "/salle3", iconSrc: imgSalle3 },
                { id: 4, name: "校 長 室", mission: "QG Résistance", isUnlocked: false, path: "/salle4", iconSrc: imgSalle4 }
            ];
        }
    });

    const maxXP = 100;
    const progressPercentage = (currentXP / maxXP) * 100;

    // Calcul du grade actuel (On prend le niveau - 1 car les tableaux commencent à 0)
    // Si on dépasse le niveau 4, on garde le dernier grade
    const currentRank = RANK_NAMES[Math.min(level - 1, RANK_NAMES.length - 1)] || "RÉSISTANT";

    // --- 3. SAUVEGARDE AUTOMATIQUE (SAVE) ---
    useEffect(() => {
        localStorage.setItem('playerLevel', level);
        localStorage.setItem('playerXP', currentXP);
        localStorage.setItem('playerRooms', JSON.stringify(rooms));
    }, [level, currentXP, rooms]);


    // --- 4. LOGIQUE DU JEU ---
    const gagnerXP = () => {
        let newXP = currentXP + 25;

        if (newXP >= maxXP) {
            setCurrentXP(0);
            const nextLevel = level + 1;
            setLevel(nextLevel);

            setRooms(prevRooms => prevRooms.map(room => {
                if (room.id === nextLevel) {
                    return { ...room, isUnlocked: true };
                }
                return room;
            }));

            // On récupère le nom du nouveau grade pour l'alerte
            const newRankName = RANK_NAMES[Math.min(nextLevel - 1, RANK_NAMES.length - 1)];
            alert(`Niveau ${nextLevel} atteint ! Tu deviens : ${newRankName} !`);
        } else {
            setCurrentXP(newXP);
        }
    };

    const handleRoomClick = (room) => {
        if (room.isUnlocked) {
            navigate(room.path);
        }
    };

    const resetGame = () => {
        if (window.confirm("⚠️ Attention : Veux-tu vraiment effacer ta progression ?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="village-container" style={{ position: 'relative' }}>

            {/* --- ZONE DE TEST (EN HAUT À GAUCHE) --- */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 100,
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                alignItems: 'flex-start'
            }}>
                <button
                    onClick={gagnerXP}
                    style={{
                        padding: '10px 15px',
                        fontSize: '0.9rem',
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                        color: 'white',
                        background: 'linear-gradient(135deg, #ff0055 0%, #ff00aa 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(255, 0, 85, 0.4)',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        width: '180px'
                    }}
                >
                    ⚡ Gagner XP
                </button>

                <button
                    onClick={resetGame}
                    style={{
                        padding: '8px 15px',
                        fontSize: '0.8rem',
                        fontFamily: 'monospace',
                        color: '#ccc',
                        background: 'rgba(0,0,0,0.8)',
                        border: '1px solid #555',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        width: '180px'
                    }}
                >
                    🗑️ Reset Data
                </button>
            </div>


            {/* --- LE HUD DU JOUEUR (En haut à droite) --- */}
            <div className="player-hud">
                <div className="hud-avatar">
                    <span className="level-badge">{level}</span>
                </div>
                <div className="hud-info">
                    {/* C'est ICI que le nom change tout seul ! */}
                    <div className="hud-name">{currentRank}</div>

                    <div className="xp-bar-container">
                        <div
                            className="xp-bar-fill"
                            style={{
                                width: `${progressPercentage}%`,
                                transition: 'width 0.5s ease-in-out'
                            }}
                        ></div>
                        <div className="xp-text">{currentXP} / {maxXP} XP</div>
                    </div>
                </div>
            </div>

            <h1 className="title">Lycée NIRD</h1>

            <div className="map-grid">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        style={{ opacity: room.isUnlocked ? 1 : 0.5, cursor: room.isUnlocked ? 'pointer' : 'not-allowed' }}
                        className={`room-card ${room.isUnlocked ? 'room-unlocked' : 'room-locked'}`}
                        onClick={() => handleRoomClick(room)}
                    >
                        <div className="room-inside">
                            <img src={room.iconSrc} alt={room.mission} className="anime-icon-img" />
                            <div className="room-text">
                                <h3>{room.mission}</h3>
                                {!room.isUnlocked && <span style={{ fontSize: '2em' }}>🔒</span>}
                            </div>
                        </div>

                        <div className="door-panel">
                            <div className="wood-sign">{room.name}</div>
                            <div className="door-handle-jp"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                            <div className="shoji-paper"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VillageMap;