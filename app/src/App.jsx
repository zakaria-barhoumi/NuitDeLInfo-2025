// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VillageMap from './VillageMap';

// Tu créeras ces fichiers plus tard pour les vraies salles
const Salle1 = () => <h1 style={{ color: 'white' }}>Bienvenue Salle 1</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<VillageMap />} />
        <Route path="/salle1" element={<Salle1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;