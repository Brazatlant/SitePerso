const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let scores = {
  player1: 0,
  player2: 0
};

io.on('connection', (socket) => {
  console.log('Un joueur est connecté');

  // Envoyer les scores actuels au joueur qui se connecte
  socket.emit('score-update', scores);

  // Gestion des lancers de dés pour Joueur 1
  socket.on('roll-dice-player1', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    scores.player1 += diceRoll;
    io.emit('score-update', scores); // Mise à jour pour tous les joueurs
  });

  // Gestion des lancers de dés pour Joueur 2
  socket.on('roll-dice-player2', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    scores.player2 += diceRoll;
    io.emit('score-update', scores); // Mise à jour pour tous les joueurs
  });

  socket.on('disconnect', () => {
    console.log('Un joueur est déconnecté');
  });
});

app.use(express.static('public')); // Dossier des fichiers statiques (HTML, CSS, JS)

server.listen(3010, () => {
  console.log('Serveur en écoute sur le port 3000');
});
