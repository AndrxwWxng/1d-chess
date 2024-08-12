'use client';
import React from 'react';
import Board from '../components/board';
import { GameProvider, useGame } from '../context/gameContext';
import { Button } from "@/components/ui/button";

const GameInfo = () => {
  const { currentPlayer, isGameOver, winner, resetGame } = useGame();

  return (
    <div className="mt-4 text-center">
      {!isGameOver ? (
        <p className="text-xl font-semibold">{currentPlayer === 'white' ? "White" : "Black"}'s turn</p>
      ) : (
        <p className="text-xl font-semibold">{winner === 'white' ? "White" : "Black"} wins!</p>
      )}
      <Button className="mt-4" onClick={resetGame}>New Game</Button>
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