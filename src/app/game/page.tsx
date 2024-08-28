'use client';
import React, { Suspense } from 'react';
import GameBoard from '@/components/gameBoard';

export default function GamePage() {
  return (
    <Suspense fallback={<div>Loading game...</div>}>
      <GameBoard />
    </Suspense>
  );
}