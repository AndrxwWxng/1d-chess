import React from 'react';
// import { GameContext } from '../context/GameContext';
// import Piece from './Piece';

const Square = ({ index }: { index: number }) => {
//   const { board, handleSquareClick } = useContext(GameContext);
  return (
    <div 
    className="square" 
    style={{ 
        width: '50px', 
        height: '50px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        border: '1px solid black', 
        backgroundColor: index % 2 === 0 ? 'white' : 'black'
        }}>
    </div>
  );
};

export default Square;
