import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Room from './Room';
import Room1 from './Room1';
import Character from './components/CharacterDisplay.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer position="bottom-center" autoClose={5000} />
    </Router>

);
}

export default App;