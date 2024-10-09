const socket = io();

// Lier le bouton au lancement du dé pour Joueur 1 ou Joueur 2
const rollDiceButton = document.getElementById('roll-dice');

let player = window.location.pathname.includes('joueur1') ? 'player1' : 'player2';

rollDiceButton.addEventListener('click', () => {
  if (player === 'player1') {
    socket.emit('roll-dice-player1');
  } else {
    socket.emit('roll-dice-player2');
  }
});

// Recevoir les mises à jour des scores du serveur
socket.on('score-update', (scores) => {
  document.getElementById('player1-score').textContent = scores.player1;
  document.getElementById('player2-score').textContent = scores.player2;
});
