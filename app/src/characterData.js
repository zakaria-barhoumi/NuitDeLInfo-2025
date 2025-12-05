// src/characterData.js
import rayleighImg from './assets/rayleigh.jpg';


export const characters = {
    "1": {
        name: "Silvers Rayleigh",
        image: rayleighImg,
        unlocks: "2",
        quiz: [
            {
                question: "Une technologie à la mode ou une architecture sobre ?",
                answers: [
                    { text: "Je prends le dernier framework à la mode, même s'il est lourd !", correct: false },
                    { text: "Je choisis une technologie stable et légère qui durera 10 ans.", correct: true }
                ]
            },
            {
                question: "Tu écris des commentaires ou tu gardes tout dans ta tête ?",
                answers: [
                    { text: "J'écris un Logbook (documentation) clair pour mon équipage.", correct: true },
                    { text: "C'est tout dans ma tête, les vrais pirates n'écrivent rien !", correct: false }
                ]
            }
        ]
    },
    "2": {
        name: "Monkey D. Luffy",
        image: "https://upload.wikimedia.org/wikipedia/en/c/cb/Monkey_D_Luffy.png",
        unlocks: "3",
        quiz: [
            {
                question: "Accessibilité ou Design graphique ?",
                answers: [
                    { text: "Il faut que tout le monde puisse manger... euh, naviguer !", correct: true },
                    { text: "Je veux que ça explose de couleurs, tant pis si ça rame !", correct: false }
                ]
            },
            {
                question: "Compatible lecteurs d'écran ou tu les laisses sur le quai ?",
                answers: [
                    { text: "S'ils ne voient pas, ils ne peuvent pas être pirates !", correct: false },
                    { text: "Tout le monde monte à bord, mon site est accessible à 100% !", correct: true }
                ]
            }
        ]
    },
    "3": {
        name: "Roronoa Zoro",
        image: "https://upload.wikimedia.org/wikipedia/en/a/a4/Roronoa_Zoro.jpg",
        unlocks: null,
        quiz: [
            {
                question: "En haut à gauche ou caché ?",
                answers: [
                    { text: "En haut à gauche, là où tout le monde regarde.", correct: true },
                    { text: "Je l'ai mis en bas à droite, faut chercher un peu !", correct: false }
                ]
            },
            {
                question: "Tu pièges l'utilisateur ou tu le laisses tranquille ?",
                answers: [
                    { text: "Je cache la croix de fermeture pour qu'ils restent !", correct: false },
                    { text: "Je le laisse libre, un sabreur a de l'honneur.", correct: true }
                ]
            }
        ]
    }
};