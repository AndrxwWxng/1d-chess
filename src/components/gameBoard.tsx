'use client';
import React from 'react';
import Board from './board';
import GameInfo from './gameInfo';
import { useSearchParams } from 'next/navigation';
import { GameProvider } from '@/context/gameContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GameBoard = () => {
  const searchParams = useSearchParams();
  const gameMode = searchParams.get('mode') as '1v1' | '1vbot';

  if (!gameMode) {
    return <div>Error: No game mode selected.</div>;
  }

  return (
    <GameProvider initialGameMode={gameMode}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
        <Card className="p-8 bg-white rounded-lg shadow-2xl">
          <CardContent>
            <h1 className="text-4xl font-bold text-center mb-6">1D Chess</h1>
            <h2 className="text-2xl font-semibold text-center mb-4">
              {gameMode === '1v1' ? 'Player vs Player' : 'Player vs Bot'}
            </h2>
            <Board />
            <GameInfo />
            <Button onClick={() => window.history.back()} className="mt-4">
              Back to Welcome Page
            </Button>
          </CardContent>
        </Card>
      </div>
    </GameProvider>
  );
};

export default GameBoard;