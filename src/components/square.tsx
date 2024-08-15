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
      } relative`}
    >
      {piece ? <ChessPiece piece={piece} /> : null}
      {isSelected && (
        <div className="absolute w-4 h-4 bg-blue-500 rounded-full" />
      )}
      {isAvailableMove && (
        <div className="absolute w-4 h-4 bg-green-500 rounded-full" />
      )}
    </div>
  );
};

export default Square;