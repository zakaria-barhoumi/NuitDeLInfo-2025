import React from 'react';
import { useParams } from 'react-router-dom';

function Character() {
  const { id } = useParams();

  return (
    <div>
      <h1>Character Interaction</h1>
      <p>You are now interacting with Character {id}.</p>
      {/* Dialogue and interaction logic will go here */}
    </div>
  );
}

export default Character;