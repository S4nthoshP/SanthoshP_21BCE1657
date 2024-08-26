import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import ChessBoard from './ChessBoard';
import Player from './Player';

// Initialize Socket.IO client and connect to the server
const socket = io('http://localhost:3000');

const App = () => {
  // State hooks for managing game ID, game state, player number, and game start status
  const [gameId, setGameId] = useState('');
  const [gameState, setGameState] = useState(null);
  const [playerNumber, setPlayerNumber] = useState('A');
  const [gameStarted, setGameStarted] = useState(false);

  // Setup socket event listeners on component mount
  useEffect(() => {
    // Update game state and player number based on server updates
    socket.on('gameState', (state) => {
      setGameState(state);
      if (state.players[0] === socket.id) {
        setPlayerNumber('A');
      } else if (state.players[1] === socket.id) {
        setPlayerNumber('B');
      }
    });

    // Alert user if game is full
    socket.on('fullGame', (message) => {
      alert(message);
    });

    // Cleanup event listeners on component unmount
    return () => {
      socket.off('gameState');
      socket.off('fullGame');
    };
  }, []);

  // Function to create a new game
  const createGame = () => {
    const id = Math.random().toString(36).substring(2, 7); // Generate a random game ID
    setGameId(id);
    socket.emit('createGame', id); // Notify server to create a game
    setGameStarted(true); // Mark game as started
  };

  // Function to join an existing game
  const joinGame = (id) => {
    socket.emit('joinGame', id); // Notify server to join the game
    setGameStarted(true); // Mark game as started
  };

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  // Function to make a move in the game
  const makeMove = (moveData) => {
    if (gameState.turn !== playerNumber) return; // Ensure it's the player's turn
    socket.emit('makeMove', { gameId: gameId, move: moveData }); // Notify server of the move
  };

  // Display a win/lose message if there's a winner
  if (gameState && gameState.winner) {
    if (gameState.winner === playerNumber) {
      return <h1 className='text-center text-cyan-400'>Congratulations! You Win</h1>;
    } else {
      return <h1 className='text-center text-pink-400'>You Lose, Try Again!</h1>;
    }
  }

  return (
    <div 
      className={`flex flex-col items-center justify-center min-h-screen ${!gameStarted ? 'bg-cover bg-center' : 'bg-black'} bg-no-repeat`}
      style={{ backgroundImage: !gameStarted ? 'url(/wall.jpg)' : 'none' }}
    >
      <h1 className='text-5xl font-extrabold mb-8 text-purple-400'>
        Combat Chess
      </h1>
      {!gameStarted && (
        <>
          <div className='mb-4'>
            <button
              onClick={createGame}
              className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600'
            >
              Create Game
            </button>
          </div>
          <div className='mb-4'>
            <input
              type='text'
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              placeholder='Game ID'
              className='px-4 py-2 border border-gray-600 bg-gray-800 text-white rounded-lg shadow-sm'
            />
          </div>
          <div className='mb-4'>
            <button
              onClick={() => joinGame(gameId)}
              className='px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600'
            >
              Join Game
            </button>
          </div>
        </>
      )}
      {gameState && (
        <h1
          className={`mb-4 ${
            playerNumber === 'A' ? 'text-emerald-400' : 'text-red-400'
          }`}
        >
          Player {playerNumber}
        </h1>
      )}
      {gameState && (
        <div className='flex flex-row gap-5 items-center justify-center mb-4 p-2 bg-gray-900 rounded-lg shadow-md'>
          GameID:
          <p className='font-bold text-xl text-cyan-400'>{gameId}</p>
          <button
            onClick={() => copyToClipboard(gameId)}
            className='px-4 py-2 bg-gray-700 text-white rounded-lg shadow-lg hover:bg-gray-800'
          >
            Copy ID
          </button>
        </div>
      )}
      {gameState && <ChessBoard board={gameState.board} makeMove={makeMove} />}
      {gameState && <Player />}
    </div>
  );
};

export default App;
