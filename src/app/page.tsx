'use client';
// import React from 'react';
// import Board from '../components/board';
// import { GameProvider, useGame } from '../context/gameContext';
// import { Button } from "@/components/ui/button";
// import board from "@/components/board"
// import './context/gameContext'


// 'use client';
// import React, { useState } from 'react';
// import WelcomePage from '../components/welcome';
// import GameBoard from '../components/gameBoard';
// import { GameProvider } from '../context/gameContext';

// export default function Home() {
//   const [gameMode, setGameMode] = useState<'1v1' | '1vbot' | null>(null);

//   if (!gameMode) {
//     return <WelcomePage onSelectMode={setGameMode} />;
//   }

//   return (
//     <GameProvider initialGameMode={gameMode}>
//       <GameBoard />
//     </GameProvider>
//   );
// }

'use client';
import React from 'react';
import WelcomePage from '@/components/welcome';

export default function HomePage() {
  return <WelcomePage />;
}