import React from 'react';
import Square from './square';
// import {GameContext} from '../context.tsx/gameContext';

const Board = () => {
    const BoardSize = 8;
    const board = Array(BoardSize).fill(null);
    // const { board } = useContext(GameContext);
    return (
        <div className='board' style={{ display: 'flex'}}>
            {board.map((_, index) => (
                <Square key={index} index={index} />
            ))}
        </div>
    );
};

export default Board;