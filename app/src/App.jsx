import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from './Room';
import Room1 from './Room1';
import Character from './Character';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/room1" element={<Room1 />} />
        <Route path="/character/:id" element={<Character />} />
      </Routes>
    </Router>
  );
}

export default App;