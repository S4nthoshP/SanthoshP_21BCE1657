import { useEffect } from 'react';

// ChessBoard component receives `board` and `makeMove` as props
const ChessBoard = ({ board, makeMove }) => {
  // State to keep track of movement input
  let movement = { move: '' };

  // Effect hook to handle keyboard inputs for moves
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Update movement.character based on number keys
      if (
        event.key === '1' ||
        event.key === '2' ||
        event.key === '3' ||
        event.key === '4' ||
        event.key === '5'
      ) {
        movement.character = event.key;
      }
      // Update movement.move based on direction keys
      if (
        event.key === 'f' ||
        event.key === 'b' ||
        event.key === 'l' ||
        event.key === 'r'
      ) {
        movement.move += event.key;
        // Reset move if it becomes invalid
        if (
          movement.move !== 'f' &&
          movement.move !== 'b' &&
          movement.move !== 'l' &&
          movement.move !== 'r' &&
          movement.move !== 'fl' &&
          movement.move !== 'fr' &&
          movement.move !== 'bl' &&
          movement.move !== 'br'
        ) {
          movement.move = event.key;
        }
      }
      // Clear movement on Escape key press
      if (event.key === 'Escape') {
        movement = { move: '' };
      }
      // Make a move on Enter key press
      if (event.key === 'Enter') {
        console.log(movement);
        makeMove(movement); // Notify parent component to process the move
        movement = { move: '' }; // Reset movement
      }
    };

    // Add event listener for keydown
    window.addEventListener('keydown', handleKeyDown);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Render chessboard with pieces
  return (
    <div className='grid grid-cols-5 gap-1 bg-gray-800 p-2'>
      {board.flat().map((piece, index) => (
        <div
          key={index}
          className={`w-[100px] h-[100px] flex items-center justify-center text-xl 
                                border ${
                                  String(
                                    board[parseInt(index / 5)][
                                      parseInt(index % 5)
                                    ]
                                  ).substring(0, 1) === 'A'
                                    ? 'border-green-400 bg-black-200 text-emerald-400'
                                    : String(
                                        board[parseInt(index / 5)][
                                          parseInt(index % 5)
                                        ]
                                      ).substring(0, 1) === 'B'
                                    ? 'border-red-400 bg-black-200 text-rose-400'
                                    : index % 2 === 0
                                    ? 'border-gray-300 bg-black-400'
                                    : 'border-gray-300 bg-slate-700'
                                }`}
        >
          {board[parseInt(index / 5)][parseInt(index % 5)]}
        </div>
      ))}
    </div>
  );
};

export default ChessBoard;
