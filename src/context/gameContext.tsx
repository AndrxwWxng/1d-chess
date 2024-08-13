// import React, { createContext, useState } from 'react';

// const initialState = {
//   board: Array(8).fill(null),
//   // Other state variables like current player, etc.
// };

// export const GameContext = createContext();

// export const GameProvider = ({ children }) => {
//   const [state, setState] = useState(initialState);

//   const handleSquareClick = (index) => {
//     // Logic for handling square click
//   };

//   return (
//     <GameContext.Provider value={{ ...state, handleSquareClick }}>
//       {children}
//     </GameContext.Provider>
//   );
// };
'use client';
import React, { createContext, useState, useContext } from 'react';

type GameState = {
  board: string[];
  currentPlayer: 'white' | 'black';
  selectedPiece: number | null;
  availableMoves: number[];
  isGameOver: boolean;
  winner: 'white' | 'black' | null;
};

const initialState: GameState = {
  board: ['WK', 'WN', 'WR', '', '', 'BR', 'BN', 'BK'],
  currentPlayer: 'white',
  selectedPiece: null,
  availableMoves: [],
  isGameOver: false,
  winner: null,
};

type GameContextType = GameState & {
  handleSquareClick: (index: number) => void;
  resetGame: () => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<GameState>(initialState);

  const calculateAvailableMoves = (index: number) => {
    const piece = state.board[index];
    if (!piece || (state.currentPlayer === 'white' && piece[0] !== 'W') || (state.currentPlayer === 'black' && piece[0] !== 'B')) {
      return [];
    }

    const moves = [];
    if (piece[1] === 'K') {
      if (index > 0 && (!state.board[index - 1] || state.board[index - 1][0] !== piece[0])) moves.push(index - 1);
      if (index < state.board.length - 1 && (!state.board[index + 1] || state.board[index + 1][0] !== piece[0])) moves.push(index + 1);
    }
    if (piece[1] === 'R') {
      for (let i = index - 1; i >= 0; i--) {
        if (!state.board[i]) moves.push(i);
        else if (state.board[i][0] !== piece[0]) {
          moves.push(i);
          break;
        } else break;
      }
      for (let i = index + 1; i < state.board.length; i++) {
        if (!state.board[i]) moves.push(i);
        else if (state.board[i][0] !== piece[0]) {
          moves.push(i);
          break;
        } else break;
      }
    }
    if (piece[1] === 'N') {
      if (index > 1 && (!state.board[index - 2] || state.board[index - 2][0] !== piece[0])) moves.push(index - 2);
      if (index < state.board.length - 2 && (!state.board[index + 2] || state.board[index + 2][0] !== piece[0])) moves.push(index + 2);
    }

    return moves;
  };

  const handleSquareClick = (index: number) => {
    if (state.isGameOver) return;

    const { board, selectedPiece, currentPlayer } = state;

    if (selectedPiece === null) {
      const piece = board[index];
      if (piece && (currentPlayer === 'white' ? piece[0] === 'W' : piece[0] === 'B')) {
        const availableMoves = calculateAvailableMoves(index);
        setState({ ...state, selectedPiece: index, availableMoves });
      }
    } else if (state.availableMoves.includes(index)) {
      const newBoard = [...board];
      newBoard[index] = newBoard[selectedPiece];
      newBoard[selectedPiece] = '';

      const newPlayer = currentPlayer === 'white' ? 'black' : 'white';
      const gameStatus = checkGameStatus(newBoard, newPlayer);

      setState({
        ...state,
        board: newBoard,
        currentPlayer: newPlayer,
        selectedPiece: null,
        availableMoves: [],
        isGameOver: gameStatus !== 'ongoing',
        winner: gameStatus === 'checkmate' ? currentPlayer : (gameStatus === 'stalemate' ? 'draw' : null),
      });
    } else {
      setState({ ...state, selectedPiece: null, availableMoves: [] });
    }
  };

  const checkGameStatus = (board: string[], currentPlayer: 'white' | 'black'): 'ongoing' | 'checkmate' | 'stalemate' => {
    const opponentColor = currentPlayer === 'white' ? 'B' : 'W';
    let hasLegalMoves = false;

    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === opponentColor) {
        const moves = calculateAvailableMoves(i);
        if (moves.length > 0) {
          hasLegalMoves = true;
          break;
        }
      }
    }

    if (!hasLegalMoves) {
      const kingPosition = board.indexOf(opponentColor + 'K');
      const isInCheck = calculateAvailableMoves(kingPosition).some(move => board[move][1] === 'K');
      return isInCheck ? 'checkmate' : 'stalemate';
    }

    return 'ongoing';
  };

  const resetGame = () => {
    setState(initialState);
  };

  return (
    <GameContext.Provider value={{ ...state, handleSquareClick, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};