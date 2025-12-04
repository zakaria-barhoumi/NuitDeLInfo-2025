import React from 'react';
import { Link } from 'react-router-dom';
import './Room.css';

function Room() {
  return (
    <div className="room-container">
      <div className="player-character">Player</div>
      
      {/* NPC Hotspots */}
      <Link to="/character/1" className="npc-hotspot" style={{ top: '30%', left: '50%' }}>
        <span>Character 1</span>
      </Link>

      <div className="room-title">The NIRD Room</div>
    </div>
  );
}

export default Room;