// src/pages/CharacterPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate pour rediriger si besoin
import { toast } from 'react-toastify';
import CharacterDisplay from "../components/CharacterDisplay.jsx";
import { characters } from '../characterData';
import '../components/characterDisplay.css';

const CharacterPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const characterInfo = characters[id];

    // --- STATES ---
    const [dialogueLines, setDialogueLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);


    const [phase, setPhase] = useState('dialogue'); // 'dialogue', 'quiz', 'completed', 'locked'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answerStatus, setAnswerStatus] = useState(null); // 'correct' ou 'incorrect' (pour la couleur)

    useEffect(() => {
        // Le personnage 1 est toujours ouvert. Les autres nécessitent une clé dans le localStorage.
        if (id !== "1") {
            const isUnlocked = localStorage.getItem(`unlocked_${id}`);
            if (!isUnlocked) {
                setPhase('locked');
                toast.error("⛔ Ce personnage est encore verrouillé !");
            }
        }
    }, [id]);

    // --- 2. RECUPERATION DU DIALOGUE ---
    useEffect(() => {
        if (phase === 'locked') return;

        // Reset des états quand on change de page
        setPhase('dialogue');
        setCurrentQuestionIndex(0);
        setAnswerStatus(null);

        fetch(`http://localhost:3001/api/dialogue/${id}`)
            .then(res => res.json())
            .then(data => {
                setDialogueLines(data.lines);
                setCurrentLineIndex(0);
            })
            .catch(err => console.error("Erreur fetch dialogue", err));
    }, [id]);

    // --- 3. TIMER POUR LE DIALOGUE ---
    useEffect(() => {
        if (phase === 'dialogue' && dialogueLines.length > 0) {
            const interval = setInterval(() => {
                setCurrentLineIndex((prev) => {
                    // Si on arrive à la fin du texte
                    if (prev >= dialogueLines.length - 1) {
                        clearInterval(interval);

                        // Si le perso a un quiz, on passe en phase Quiz
                        if (characterInfo?.quiz && characterInfo.quiz.length > 0) {
                            setTimeout(() => setPhase('quiz'), 2000); // Petite pause avant le quiz
                        } else {
                            setPhase('completed');
                        }
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1500); // Vitesse du texte
            return () => clearInterval(interval);
        }
    }, [phase, dialogueLines, characterInfo]);


    // --- 4. GESTION DES REPONSES ---
    const handleAnswer = (isCorrect) => {
        if (answerStatus) return; // Empêche le double clic

        if (isCorrect) {
            setAnswerStatus('correct');
            toast.success("✅ Bonne réponse !", { theme: "colored", autoClose: 1000 });

            // Attendre 1.5s avant de passer à la suite
            setTimeout(() => {
                const nextIndex = currentQuestionIndex + 1;

                // Y a-t-il encore des questions ?
                if (nextIndex < characterInfo.quiz.length) {
                    setCurrentQuestionIndex(nextIndex);
                    setAnswerStatus(null); // Reset pour la prochaine question
                } else {
                    // TOUTES les questions sont finies !
                    finishLevel();
                }
            }, 1500);

        } else {
            setAnswerStatus('incorrect');
            toast.error("❌ Mauvaise réponse. Essaie encore !", { theme: "colored" });
            // On laisse le joueur réessayer (reset status après délai ou laisser rouge)
            setTimeout(() => setAnswerStatus(null), 2000);
        }
    };

    const finishLevel = () => {
        setPhase('completed');

        // DEVERROUILLAGE DU PROCHAIN PERSO
        if (characterInfo.unlocks) {
            localStorage.setItem(`unlocked_${characterInfo.unlocks}`, 'true');
            toast.success(`🎉 NOUVEAU PERSONNAGE DÉBLOQUÉ : Personnage ${characterInfo.unlocks} !`, {
                position: "top-center",
                autoClose: 5000,
                theme: "dark"
            });
        }
    };

    // --- RENDU : ÉCRAN VERROUILLÉ ---
    if (phase === 'locked') {
        return (
            <div className="character-page-container" style={{ filter: 'grayscale(100%)' }}>
                <h1 style={{ color: 'white', backgroundColor: 'black', padding: 20 }}>🔒 PERSONNAGE VERROUILLÉ</h1>
                <p style={{ color: 'white' }}>Finis l'épreuve précédente pour entrer.</p>
                <button onClick={() => navigate('/character/1')} style={{ padding: 10, cursor: 'pointer' }}>
                    Retourner au début
                </button>
            </div>
        );
    }

    if (!characterInfo) return <div>Personnage introuvable</div>;

    // Déterminer quel texte afficher
    let displayedText = "...";
    if (phase === 'dialogue') {
        displayedText = dialogueLines[currentLineIndex] || "...";
    } else if (phase === 'quiz') {
        displayedText = characterInfo.quiz[currentQuestionIndex].question;
    } else if (phase === 'completed') {
        displayedText = "Félicitations ! Tu as prouvé ta valeur. La suite t'attend.";
    }

    return (
        <CharacterDisplay
            image={characterInfo.image}
            name={characterInfo.name}
            text={displayedText}
        >
            {/* AFFICHAGE DU QUIZ */}
            {phase === 'quiz' && characterInfo.quiz[currentQuestionIndex] && (
                <div className="validation-buttons">
                    {characterInfo.quiz[currentQuestionIndex].answers.map((ans, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(ans.correct)}
                            // Logique de couleur conditionnelle complexe
                            className={
                                answerStatus === 'correct' && ans.correct ? 'correct-answer' :
                                    answerStatus === 'incorrect' && !ans.correct ? 'wrong-answer' : ''
                            }
                            disabled={!!answerStatus}
                        >
                            {/* Affiche A, B, etc. */}
                            {index === 0 ? "1️⃣ " : "2️⃣ "} {ans.text}
                        </button>
                    ))}
                </div>
            )}

            {/* BOUTON SUIVANT (Visible à la fin) */}
            {phase === 'completed' && characterInfo.unlocks && (
                <div className="validation-buttons">
                    <button
                        className="correct-answer"
                        onClick={() => navigate(`/character/${characterInfo.unlocks}`)}
                    >
                        🚀 Aller voir le prochain personnage
                    </button>
                </div>
            )}
        </CharacterDisplay>
    );
};

export default CharacterPage;