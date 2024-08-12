'use client';
import React from 'react';
import Square from './square';
import { Card, CardContent } from './ui/card';
import { useGame } from '../context/gameContext';

const Board = () => {
  const { board, handleSquareClick, selectedPiece, availableMoves } = useGame();

  return (
    <Card className='w-fit'>
      <CardContent className='p-6'>
        <div className='flex bg-black p-2 rounded-md shadow-lg'>
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
      </CardContent>
    </Card>
  );
};

export default Board;