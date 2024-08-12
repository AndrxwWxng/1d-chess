import React from 'react';
import ChessPiece from './piece';

type SquareProps = {
  index: number;
  piece: string;
  onClick: () => void;
  isSelected: boolean;
  isAvailableMove: boolean;
};

const Square: React.FC<SquareProps> = ({ index, piece, onClick, isSelected, isAvailableMove }) => {
  return (
    <div
      onClick={onClick}
      className={`w-20 h-20 flex items-center justify-center text-4xl border border-stone-700 cursor-pointer ${
        index % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'
      } ${isSelected ? 'ring-4 ring-blue-500' : ''} ${isAvailableMove ? 'ring-4 ring-green-500' : ''}`}
    >
      {piece ? <ChessPiece piece={piece} /> : null}
    </div>
  );
};

export default Square;