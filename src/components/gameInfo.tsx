import React from 'react';
import { useGame } from '../context/gameContext';
import { Button } from "@/components/ui/button";

const GameInfo = () => {
  const { board, currentPlayer, isCheck, isGameOver, winner, resetGame, gameMode } = useGame();
  const checkStatus = isCheck(board, currentPlayer);

  return (
    <div className="mt-6 text-center">
      {!isGameOver ? (
        <>
          <p className="text-xl font-semibold mb-2">
            {gameMode === '1vbot' && currentPlayer === 'black' 
              ? "Bot's turn" 
              : `${currentPlayer === 'white' ? "White" : "Black"}'s turn`}
          </p>
          {checkStatus && (
            <p className='text-xl font-semibold text-red-500 mb-2'>Check!</p>
          )}
        </>
      ) : (
        <p className="text-xl font-semibold mb-4">
          {winner === 'draw' ? "Stalemate! It's a draw!" : `${winner === 'white' ? "White" : "Black"} wins by checkmate!`}
        </p>
      )}
      <Button onClick={resetGame} variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">New Game</Button>
  {/* 
        <Button className="mt-4" onClick={resetGame}>Nothing</Button> */}
      </div>
    );
  };
  
  export default GameInfo;