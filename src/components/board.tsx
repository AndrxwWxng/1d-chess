'use client';
import React from 'react';
import Square from './square';
import { useGame } from '../context/gameContext';

const Board = () => {
  const { board, handleSquareClick, selectedPiece, availableMoves } = useGame();

  return (
    <div className='flex bg-gradient-to-r from-amber-200 to-amber-400 p-2 rounded-md shadow-lg'>
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
  );
};

export default Board;