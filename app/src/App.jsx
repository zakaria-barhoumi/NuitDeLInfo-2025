import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Composants de ton branch
import Room from './Room';
import Room1 from './Room1';
import Character from './components/CharacterDisplay.jsx';
import CharacterPage from "./pages/CharacterPage.jsx";

// Composants du branch distant
import VillageMap from './VillageMap';
import HomePage from './HomePage';

import './App.css';

// --- PAGES TEMPORAIRES (Pour tester que les portes marchent) ---
const Salle1 = () => (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        <h1>🚪 SALLE 1 : Machines Oubliées</h1>
        <p>Bienvenue dans la première zone.</p>
        <a href="/village" style={{ color: '#00d2ff', textDecoration: 'none', border: '1px solid #00d2ff', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', marginTop: '20px' }}>
            Retour au Village
        </a>
    </div>
);

const Salle2 = () => (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
        <h1>☁️ SALLE 2 : Cloud Impérial</h1>
        <p>Zone sécurisée - Niveau 2 requis.</p>
        <a href="/village" style={{ color: '#00d2ff', textDecoration: 'none', border: '1px solid #00d2ff', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', marginTop: '20px' }}>
            Retour au Village
        </a>
    </div>
);

function App() {
    return (
        <Router>
            <Routes>
                {/* 🏠 Page d'accueil */}
                <Route path="/" element={<HomePage />} />

                {/* 🗺️ Carte du village */}
                <Route path="/village" element={<VillageMap />} />

                {/* 🚪 Salles */}
                <Route path="/salle1" element={<Salle1 />} />
                <Route path="/salle2" element={<Salle2 />} />

                {/* Routes pour tes personnages (ajoute-les si nécessaire) */}
                <Route path="/character/:id" element={<CharacterPage />} />
                {/* Ajoute tes autres routes Room, Room1, etc. si besoin */}
            </Routes>

            <ToastContainer position="bottom-center" autoClose={5000} />
        </Router>
    );
}

export default App;