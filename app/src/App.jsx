import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VillageMap from './VillageMap';

// --- PAGES TEMPORAIRES (Pour tester que les portes marchent) ---
// Plus tard, tu remplaceras ça par de vrais imports : import Salle1 from './Salle1';

const Salle1 = () => (
  <div style={{ color: 'white', textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
    <h1>🚪 SALLE 1 : Machines Oubliées</h1>
    <p>Bienvenue dans la première zone.</p>
    <a href="/" style={{ color: '#00d2ff', textDecoration: 'none', border: '1px solid #00d2ff', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', marginTop: '20px' }}>
      Retour au Village
    </a>
  </div>
);

const Salle2 = () => (
  <div style={{ color: 'white', textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
    <h1>☁️ SALLE 2 : Cloud Impérial</h1>
    <p>Zone sécurisée - Niveau 2 requis.</p>
    <a href="/" style={{ color: '#00d2ff', textDecoration: 'none', border: '1px solid #00d2ff', padding: '10px 20px', borderRadius: '5px', display: 'inline-block', marginTop: '20px' }}>
      Retour au Village
    </a>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route principale : La carte du village */}
        <Route path="/" element={<VillageMap />} />

        {/* Routes des salles (accessibles quand on clique sur une porte) */}
        <Route path="/salle1" element={<Salle1 />} />
        <Route path="/salle2" element={<Salle2 />} />

        {/* Tu pourras ajouter tes autres pages ici plus tard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;