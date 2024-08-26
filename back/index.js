const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors);
const dotenv = require('dotenv');
const server = require('http').createServer(app);
dotenv.config();
const PORT = process.env.PORT || 3000;

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const { startGame, play } = require('./logic');
const players = [];
let games = {};

io.on('connection', (socket) => {
  console.log('Player connected', socket.id);

  socket.on('createGame', (gameID) => {
    games[gameID] = {
      ...startGame(),
      players: [socket.id],
    };
    socket.join(gameID);
    io.to(gameID).emit('gameState', games[gameID]);
  });

  socket.on('joinGame', (gameID) => {
    if (games[gameID] && games[gameID].players.length < 2) {
      games[gameID].players.push(socket.id);
      socket.join(gameID);
      io.to(gameID).emit('gameState', games[gameID]);
    } else {
      socket.emit('Cannot Join', 'Either the game is full or doesnot exist');
    }
  });

  socket.on('makeMove', ({ gameId: gameID, move: move }) => {
    if (games[gameID].turn === 'A' && games[gameID].players[0] !== socket.id)
      return;
    if (games[gameID].turn === 'B' && games[gameID].players[1] !== socket.id)
      return;
    games[gameID] = play(games[gameID], move);
    io.to(gameID).emit('gameState', games[gameID]);
  });
  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  }); 
});

server.listen(PORT, () => {
  console.log('Server listening on port 3000');
});