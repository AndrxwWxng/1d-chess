'use client';
import React from 'react';
import Square from './square';
import { useGame } from '../context/gameContext';

const Board = () => {
  const { board, handleSquareClick, selectedPiece, availableMoves } = useGame();

  return (
    <div className="flex justify-center">
    <div className="flex p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
      {board.map((piece: string, index: number) => (
        <Square 
          key={index} 
          index={index} 
          piece={piece} 
          onClick={() => handleSquareClick(index)}
          isSelected={selectedPiece === index}
          isAvailableMove={availableMoves.includes(index)}
        />
      ))}
    </div>
    </div>
  );
};

export default Board;