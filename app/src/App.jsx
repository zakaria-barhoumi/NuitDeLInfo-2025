import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from './Room';
import Room1 from './Room1';
import Character from './components/characterDisplay.jsx';
import './App.css';
import CharacterPage from "./pages/CharacterPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/room1" element={<Room1 />} />
        <Route path="/character/:id" element={<CharacterPage />} />
      </Routes>
    </Router>
  );
}

export default App;