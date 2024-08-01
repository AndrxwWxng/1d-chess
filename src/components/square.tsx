import React from 'react';
import ChessPiece from './piece';
// import { GameContext } from '../context/GameContext';
// import Piece from './Piece';
type SquareProps = {
  index: number;
  piece: string;
}
const Square: React.FC<SquareProps> = ({ index, piece }) => {
//   const { board, handleSquareClick } = useContext(GameContext);
  return (
    <div
      className={`w-48 h-48 flex items-center justify-center text-4xl border border-stone-700 ${
        index % 2 === 0 ? 'bg-amber-100' : 'bg-amber-800'
      }`}
    >
      {piece && <ChessPiece piece={piece} />}
    </div>
  );
};

export default Square;
