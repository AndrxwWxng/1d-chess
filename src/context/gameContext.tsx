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
import { getBotMove } from './botLogic';

export type GameState = {
  board: string[];
  currentPlayer: 'white' | 'black';
  selectedPiece: number | null;
  availableMoves: number[];
  isGameOver: boolean;
  winner: 'white' | 'black' | 'draw' | null;
  gameMode: '1v1' | '1vbot' | null;
};

const initialState: GameState = {
  board: ['WK', 'WN', 'WR', '', '', 'BR', 'BN', 'BK'],
  currentPlayer: 'white',
  selectedPiece: null,
  availableMoves: [],
  isGameOver: false,
  winner: null,
  gameMode: null,
};

type GameContextType = GameState & {
  handleSquareClick: (index: number) => void;
  resetGame: () => void;
  isCheck: (board: string[], color: 'white' | 'black') => boolean;
  setGameMode: (mode: '1v1' | '1vbot' | null) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode, initialGameMode: '1v1' | '1vbot' }> = ({ children, initialGameMode }) => {
  const [state, setState] = useState<GameState>({
    ...initialState,
    gameMode: initialGameMode,
  });

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
    let moves = [];
  
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
  
    return moves;
  };

  // const isStalemate = (board: string[], color: 'white' | 'black') => {
  //   return !isCheck(board, color) && !hasLegalMoves(board, color);
  // };

  // const isCheckmate = (board: string[], color: 'white' | 'black') => {
  //   return isCheck(board, color) && !hasLegalMoves(board, color);
  // };

  // const isDraw = (board: string[]) => {
  //   return !board.includes('WR') && !board.includes('BR');
  // };

  const isCheck = (board: string[], color: 'white' | 'black'): boolean => {
    const kingColor = color === 'white' ? 'W' : 'B';
    const opponentColor = color === 'white' ? 'B' : 'W';
    const kingPosition = board.indexOf(kingColor + 'K');
    
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === opponentColor) {
        const moves = calculateAvailableMoves(board, i);
        if (moves.includes(kingPosition)) {
          return true;
        }
      }
    }
    return false;
  };
  const getLegalMoves = (board: string[], index: number, currentPlayer: 'white' | 'black') => {
    const moves = calculateAvailableMoves(board, index);
    return moves.filter(moveIndex => {
      const newBoard = [...board];
      newBoard[moveIndex] = newBoard[index];
      newBoard[index] = '';
      return !isCheck(newBoard, currentPlayer);
    });
  };

  const hasLegalMoves = (board: string[], color: 'white' | 'black') => {
    const playerColor = color === 'white' ? 'W' : 'B';
    
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] === playerColor) {
        const moves = calculateAvailableMoves(board, i);
        
        for (const move of moves) {
          const newBoard = [...board];
          newBoard[move] = newBoard[i];
          newBoard[i] = '';
          
          if (!isCheck(newBoard, color)) {
            return true;
          }
        }
      }
    }
    
    return false;
  };

  //should check if the resulting move results in check, meaning its illegal as it allows for the other team to capture the king
  // const illegalMoves = (board: string[], color: 'white' | 'black'): boolean => {
    
  //   const kingColor = color === 'white' ? 'W' : 'B';
  //   const opponentColor = color === 'white' ? 'B' : 'W';
  //   const kingPosition = board.indexOf(opponentColor + 'K');
    
  //   for (let i = 0; i < board.length; i++) {
  //     if (board[i][0] === kingColor) {
  //       const moves = calculateAvailableMoves(board, i);
  //       if (moves.includes(kingPosition)) {
  //         return true;
  //       }
  //     }
  //   }
  //   return false;
  // };

  // const isIllegalMove = (board: string[], fromIndex: number, toIndex: number, color: 'white' | 'black'): boolean => {
  //   const newBoard = [...board];
  //   newBoard[toIndex] = newBoard[fromIndex];
  //   newBoard[fromIndex] = '';
  
  //   return isCheck(newBoard, color);
  // };

  //logging for debug
  // const checkGameStatus = (board: string[], currentPlayer: 'white' | 'black'): 'ongoing' | 'checkmate' | 'stalemate' | 'draw' => {
  //   const opponentColor = currentPlayer === 'white' ? 'black' : 'white';
    
  //   if (isCheck(board, opponentColor)) {
  //     if (!hasLegalMoves(board, opponentColor)) {
  //       return 'checkmate';
  //     }
  //   } else if (!hasLegalMoves(board, opponentColor)) {
  //     return 'stalemate';
  //   }
    
  //   const pieceCount = board.filter(square => square !== '').length;
  //   if (pieceCount === 2) {
  //     return 'draw';
  //   }
    
  //   return 'ongoing';
  // };
  //logging these to debug
  //can remove later

  const playBot = () => {
    if (state.isGameOver || state.winner !== null){
      return;
    }
    const botMove = getBotMove(state);
    if (botMove) {
      const newBoard = [...state.board];
      newBoard[botMove.to] = newBoard[botMove.from];
      newBoard[botMove.from] = '';

      const newPlayer = state.currentPlayer === 'white' ? 'black' : 'white';

      setState({
        ...state,
        board: newBoard,
        currentPlayer: newPlayer,
        selectedPiece: null,
        availableMoves: [],
      });
  // GameState = {
  //board: ['WK', 'WN', 'WR', '', '', 'BR', 'BN', 'BK'],
  //currentPlayer: 'white',
  //selectedPiece: null,
  //availableMoves: [],
  //isGameOver: false,
  //winner: null,
  checkGameEndConditions(newBoard, newPlayer);
} else {

  const result = isCheck(state.board, state.currentPlayer) ? 'checkmate' : 'stalemate';
  setState(prevState => ({
    ...prevState,
    isGameOver: true,
    winner: result === 'checkmate' ? (state.currentPlayer === 'white' ? 'black' : 'white') : 'draw'
  }));
}
};

//can move this down later to organize
const checkGameEndConditions = (board: string[], player: 'white' | 'black') => {
  if (isInsufficientMaterial(board)) {
    setState(prev => ({ ...prev, isGameOver: true, winner: 'draw' }));
    return;
  }

  const opponentColor = player === 'white' ? 'black' : 'white';
  const isInCheck = isCheck(board, opponentColor);
  const hasLegalMove = hasLegalMoves(board, opponentColor);

  if (isInCheck && !hasLegalMove) {
    setState(prev => ({ ...prev, isGameOver: true, winner: player }));
  } else if (!isInCheck && !hasLegalMove) {
    setState(prev => ({ ...prev, isGameOver: true, winner: 'draw' }));
  }
};


  

    
  const isInsufficientMaterial = (board: string[]) => {
    return board.filter(square => square !== '').length === 2;
  };
  
  const handleSquareClick = (index: number) => {
    if (state.isGameOver) return;

    const { board, selectedPiece, currentPlayer, gameMode } = state;

    if (selectedPiece === null) {
      const piece = board[index];
      if (piece && (currentPlayer === 'white' ? piece[0] === 'W' : piece[0] === 'B')) {
        const availableMoves = getLegalMoves(board, index, currentPlayer);
        setState({ ...state, selectedPiece: index, availableMoves });
      }
    } 
    else if (state.availableMoves.includes(index)) {
      const newBoard = [...board];
      newBoard[index] = newBoard[selectedPiece];
      newBoard[selectedPiece] = '';

      const newPlayer = currentPlayer === 'white' ? 'black' : 'white';

      setState(prevState => ({
        ...prevState,
        board: newBoard,
        currentPlayer: newPlayer,
        selectedPiece: null,
        availableMoves: [],
      }));

      checkGameEndConditions(newBoard, newPlayer);
      // const isIllegalMove = illegalMoves(newBoard, newPlayer);
      
    //   if (isInCheck) {
    //     if (!hasLegalMove) {
    //       // check if checkmate
    //       setState({
    //         ...state,
    //         board: newBoard,
    //         isGameOver: true,
    //         winner: currentPlayer,
    //         selectedPiece: null,
    //         availableMoves: [],
    //       });
    //       return;
    //     }
    //     //check if check
    //     console.log(`${newPlayer} is in check!`);
    //   } else if (!hasLegalMove) {
    //     //check if stalemate
    //     setState({
    //       ...state,
    //       board: newBoard,
    //       isGameOver: true,
    //       winner: 'draw',
    //       selectedPiece: null,
    //       availableMoves: [],
    //     });
    //     return;
    //   }
  
    //   setState({
    //     ...state,
    //     board: newBoard,
    //     currentPlayer: newPlayer,
    //     selectedPiece: null,
    //     availableMoves: [],
    //   });
    // } 
    // else {
    //   setState({ ...state, selectedPiece: null, availableMoves: [] });
    // }
        // this stuff is for the bot movements
        if (gameMode === '1vbot' && newPlayer === 'black') {
          setTimeout(() => {
            const botMove = getBotMove({ ...state, board: newBoard, currentPlayer: newPlayer }, isCheck);
            if (botMove) {
              const botBoard = [...newBoard];
              botBoard[botMove.to] = botBoard[botMove.from];
              botBoard[botMove.from] = '';
              setState(prevState => ({
                ...prevState,
                board: botBoard,
                currentPlayer: 'white',
              }));
              checkGameEndConditions(botBoard, 'white');
            }
          }, 500);
        }
      } 
      else {
        setState({ ...state, selectedPiece: null, availableMoves: [] });
      }
    };
  
    const resetGame = () => {
      setState({ ...initialState, gameMode: state.gameMode });
    };
  
    const setGameMode = (mode: '1v1' | '1vbot' | null) => {
      setState({ ...initialState, gameMode: mode });
    };
  

    
  

    return (
      <GameContext.Provider value={{ ...state, handleSquareClick, resetGame, isCheck, setGameMode }}>
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