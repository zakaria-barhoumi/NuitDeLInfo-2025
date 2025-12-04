// src/pages/CharacterPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import CharacterDisplay from '../components/characterDisplay';
import { characters } from '../characterData'; // Import your data

const CharacterPage = () => {
    // 1. Get the ID from the URL (e.g., 1, 2, or 3)
    const { id } = useParams();

    // 2. Find the specific character in our list
    const character = characters[id];

    // 3. Handle case where ID doesn't exist (e.g., character/99)
    if (!character) {
        return <div>Character not found!</div>;
    }

    // 4. Render the display component with the correct data
    return (
        <CharacterDisplay
            image={character.image}
            text={character.text}
            name={character.name}
        />
    );
};

export default CharacterPage;