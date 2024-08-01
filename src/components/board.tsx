import React from 'react';
import Square from './square';
import { Card, CardContent } from './ui/card';
// import {GameContext} from '../context.tsx/gameContext';

const Board = () => {
    const BoardSize = 8;
    const board = Array(BoardSize).fill(null);
    // const { board } = useContext(GameContext);
    return (
        <Card className='w-fit'>
            <CardContent className='p-6'>
                <div className='flex bg-black p-2 rounded-md shadow-lg'>
                    {board.map((_, index) => (
                        <Square key={index} index={index} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Board;