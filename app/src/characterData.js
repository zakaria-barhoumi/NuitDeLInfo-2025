// src/characterData.js
import rayleighImg from './assets/rayleigh.jpg';

export const characters = {
    "1": {
        name: "Silvers Rayleigh",
        image: rayleighImg,
        // L'ID du personnage que ce quiz débloque
        unlocks: "3",
        quiz: [
            {
                question: "Pour rendre ton projet durable, sur quoi mises-tu ?",
                answers: [
                    { text: "Une architecture sobre et éprouvée", correct: true }, // Bonne réponse
                    { text: "Une technologie à la mode (Hype)", correct: false }
                ]
            },
            {
                question: "Que signifie le Haki de l'Observation en dév ?",
                answers: [
                    { text: "Coder plus vite que la lumière", correct: false },
                    { text: "Anticiper les erreurs et la maintenance", correct: true } // Bonne réponse
                ]
            }
        ]
    },
    "2": {
        name: "Monkey D. Luffy",
        image: "https://upload.wikimedia.org/wikipedia/en/c/cb/Monkey_D_Luffy.png",
        text: "JE SUIS LE ROI DES PIRATES !",
        unlocks: "3", // Luffy débloquera Zoro par exemple
        quiz: [] // Pas encore de quiz pour lui
    },
    "3": {
        name: "Roronoa Zoro",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a4/Roronoa_Zoro.jpg",
        text: "Rien ne s'est passé...",
        unlocks: null,
    }
};