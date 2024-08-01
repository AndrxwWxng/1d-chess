import React from 'react';
import Board from '../components/board';
import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">1D Chess</h1>
      <Board />
      <Button className="mt-4">New Game</Button>
    </div>
  );
};

export default Home;