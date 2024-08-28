'use client';
import React, { Suspense } from 'react';
import Board from './board';
import GameInfo from './gameInfo';
import { useSearchParams } from 'next/navigation';
import { GameProvider } from '@/context/gameContext';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const GameBoard = () => {
  const searchParams = useSearchParams();
  const gameMode = searchParams.get('mode') as '1v1' | '1vbot';

  if (!gameMode) {
    return <div>Error: No game mode selected.</div>;
  }

  return (
    <GameProvider initialGameMode={gameMode}>
      <Suspense fallback={<div>Loading game...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-red-500 to-purple-600 dark:from-blue-800 dark:to-purple-900 p-4 transition-colors duration-200">
      <Card className="w-full max-w-3xl shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">1D Chess</CardTitle>
            <p className="text-gray-600 dark:text-gray-300">
              {gameMode === '1v1' ? 'Player vs Player' : 'Player vs Bot'}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <Board />
            <GameInfo />
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.history.back()} variant="outline" className="bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Back to Welcome Page
            </Button>
          </CardFooter>
        </Card>
      </div>
      </Suspense>
    </GameProvider>
  );
};

export default GameBoard;