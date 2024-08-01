import React from 'react';
// import { GameContext } from '../context/GameContext';
// import Piece from './Piece';

const Square = ({ index }: { index: number }) => {
//   const { board, handleSquareClick } = useContext(GameContext);
  return (
    <div
      className={`w-48 h-48 flex items-center justify-center text-4xl border border-stone-700 ${
        index % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'
      }`}
    >
    </div>
  );
};

export default Square;
