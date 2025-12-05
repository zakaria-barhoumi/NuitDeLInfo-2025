// server/server.cjs
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows your React app to talk to this server

app.get('/api/dialogue/:id', (req, res) => {
    const characterId = req.params.id;
    // Look for the file named "1.txt", "2.txt", etc.
    const filePath = path.join(__dirname, 'dialogues', `${characterId}.txt`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ lines: ["(No dialogue file found)"] });
        }
        // Split the text file by "new line" into an array
        const lines = data.split('\n').filter(line => line.trim() !== '');
        res.json({ lines });
    });
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});