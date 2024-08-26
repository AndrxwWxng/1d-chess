'use client';
import React from 'react';
import Board from '../components/board';
import { GameProvider, useGame } from '../context/gameContext';
import { Button } from "@/components/ui/button";
// import board from "@/components/board"
// import './context/gameContext'

const GameInfo = () => {
  const { board, currentPlayer, isCheck, isGameOver, winner, resetGame, playBot,  } = useGame();
  const checkStatus = isCheck(board, currentPlayer);

  return (
    <div className="mt-4 text-center">
      {!isGameOver ? (
        <>
        <p className="text-xl font-semibold">{currentPlayer === 'white' ? "White" : "Black"}'s turn</p>
        {checkStatus && (
          <p className='text-xl font-semibold text-red-500'>Check!</p>
        )}
        </>
      ) : (
        <p className="text-xl font-semibold">
          {winner === 'draw' ? "Stalemate! It's a draw!" : `${winner === 'white' ? "White" : "Black"} wins by checkmate!`}
        </p>
      )}

      <Button className="mt-4" onClick={resetGame}>New Game</Button>
      <Button className="mt-4" onClick={playBot}>Bot Move</Button>
{/* 
      <Button className="mt-4" onClick={resetGame}>Nothing</Button> */}
    </div>
  );
};



const Home = () => {
  return (
    <GameProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">1D Chess</h1>
        <Board />
        <GameInfo />
      </div>
    </GameProvider>
  );
};

export default Home;