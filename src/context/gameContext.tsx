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

  // const calculateAvailableMoves = (board: string[], index: number) => {
  //   const piece = board[index];
  //   if (!piece || (state.currentPlayer === 'white' && piece[0] !== 'W') || (state.currentPlayer === 'black' && piece[0] !== 'B')) {
  //     return [];
  //   }

  //   const moves = [];
  //   if (piece[1] === 'K') {
  //     if (index > 0 && (!state.board[index - 1] || state.board[index - 1][0] !== piece[0])) moves.push(index - 1);
  //     if (index < state.board.length - 1 && (!state.board[index + 1] || state.board[index + 1][0] !== piece[0])) moves.push(index + 1);
  //   }
  //   if (piece[1] === 'R') {
  //     for (let i = index - 1; i >= 0; i--) {
  //       if (!state.board[i]) moves.push(i);
  //       else if (state.board[i][0] !== piece[0]) {
  //         moves.push(i);
  //         break;
  //       } else break;
  //     }
  //     for (let i = index + 1; i < state.board.length; i++) {
  //       if (!state.board[i]) moves.push(i);
  //       else if (state.board[i][0] !== piece[0]) {
  //         moves.push(i);
  //         break;
  //       } else break;
  //     }
  //   }
  //   if (piece[1] === 'N') {
  //     if (index > 1 && (!state.board[index - 2] || state.board[index - 2][0] !== piece[0])) moves.push(index - 2);
  //     if (index < state.board.length - 2 && (!state.board[index + 2] || state.board[index + 2][0] !== piece[0])) moves.push(index + 2);
  //   }

  //   return moves;
  // };
  const calculateAvailableMoves = (board: string[], index: number) => {
    const piece = board[index];
    if (!piece) return [];
  
    const color = piece[0];
    const pieceType = piece[1];
    const moves = [];
  
    console.log(`Calculating moves for ${piece} at ${index}`);
  
    if (pieceType === 'K') {
      if (index > 0 && (!board[index - 1] || board[index - 1][0] !== color)) {
        moves.push(index - 1);
      }
      if (index < board.length - 1 && (!board[index + 1] || board[index + 1][0] !== color)) {
        moves.push(index + 1);
      }
    }
  
    if (pieceType === 'R') {
      for (let i = index - 1; i >= 0; i--) {
        if (!board[i]) moves.push(i);
        else if (board[i][0] !== color) {
          moves.push(i);
          break;
        } else break;
      }
      for (let i = index + 1; i < board.length; i++) {
        if (!board[i]) moves.push(i);
        else if (board[i][0] !== color) {
          moves.push(i);
          break;
        } else break;
      }
    }
  
    if (pieceType === 'N') {
      const knightMoves = [-2, 2];
      for (const move of knightMoves) {
        const newIndex = index + move;
        if (newIndex >= 0 && newIndex < board.length && (!board[newIndex] || board[newIndex][0] !== color)) {
          moves.push(newIndex);
        }
      }
    }
  
    console.log(`Available moves:`, moves);
    return moves;
  };

  const isCheck = (board: string[], color: 'white' | 'black') => {
    const kingColor = color === 'white' ? 'W' : 'B';
    const opponentColor = color === 'white' ? 'B' : 'W';
    const kingPosition = board.indexOf(kingColor + 'K');
  
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === opponentColor) {
        const moves = calculateAvailableMoves(board, i);
        if (moves.includes(kingPosition)) {
          console.log(`${color} king is in check`);
          return true;
        }
      }
    }
    
    console.log(`${color} king is not in check`);
    return false;
  };

  const isStalemate = (board: string[], color: 'white' | 'black') => {
    return !isCheck(board, color) && !hasLegalMoves(board, color);
  };

  const isCheckmate = (board: string[], color: 'white' | 'black') => {
    return isCheck(board, color) && !hasLegalMoves(board, color);
  };

  const isDraw = (board: string[]) => {
    return !board.includes('WR') && !board.includes('BR');
  };

  const hasLegalMoves = (board: string[], color: 'white' | 'black') => {
  const playerColor = color === 'white' ? 'W' : 'B';
  
  console.log(`Checking legal moves for ${color}`);
  
  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === playerColor) {
      console.log(`Checking piece at position ${i}: ${board[i]}`);
      const moves = calculateAvailableMoves(board, i);
      console.log(`Available moves for ${board[i]} at ${i}:`, moves);
      
      for (const move of moves) {
        const newBoard = [...board];
        newBoard[move] = newBoard[i];
        newBoard[i] = '';
        
        if (!isCheck(newBoard, color)) {
          console.log(`Legal move found for ${color} from ${i} to ${move}`);
          return true;
        }
      }
    }
  }
  
  console.log(`No legal moves found for ${color}`);
  return false;
};
  //logging for debug
  const checkGameStatus = (board: string[], currentPlayer: 'white' | 'black'): 'ongoing' | 'checkmate' | 'stalemate' | 'draw' => {
  console.log('Checking game status:', { board, currentPlayer });
  
  if (isDraw(board)) {
    console.log('Game is a draw');
    return 'draw';
  }
  
  const opponentColor = currentPlayer === 'white' ? 'black' : 'white';
  
  if (isCheck(board, opponentColor)) {
    if (!hasLegalMoves(board, opponentColor)) {
      console.log('Checkmate');
      return 'checkmate';
    }
  } else if (!hasLegalMoves(board, opponentColor)) {
    console.log('Stalemate');
    return 'stalemate';
  }
  
  console.log('Game is ongoing');
  return 'ongoing';
};
  //logging these to debug
  //can remove later

  const handleSquareClick = (index: number) => {
    if (state.isGameOver) return;

    const { board, selectedPiece, currentPlayer } = state;

    if (selectedPiece === null) {
      const piece = board[index];
      if (piece && (currentPlayer === 'white' ? piece[0] === 'W' : piece[0] === 'B')) {
        const availableMoves = calculateAvailableMoves(board, index);
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
        winner: gameStatus === 'checkmate' ? currentPlayer : (gameStatus === 'stalemate' || gameStatus === 'draw' ? 'draw' : null),
      });
    } else {
      setState({ ...state, selectedPiece: null, availableMoves: [] });
    }
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