import { GameState } from '../context/gameContext';
import React, { createContext, useState, } from 'react';

export const getBotMove = (state: GameState): number | null => {
  const { board, currentPlayer } = state;
  const botColor = currentPlayer === 'white' ? 'white' : 'black';
  const botPieces = board.reduce((acc, piece, index) => {
    if (piece[0] === (botColor === 'white' ? 'W' : 'B')) {
      acc.push(index);
    }
    return acc;
  }, [] as number[]);

  for (const pieceIndex of botPieces) {
    const moves = getLegalMoves(board, pieceIndex, botColor);
    if (moves.length > 0) {
      return {
        from: pieceIndex,
        to: moves[Math.floor(Math.random() * moves.length)]
      };
    }
  }

  return null;
};
const isInsufficientMaterial = (board: string[]) => {
  return board.filter(square => square !== '').length === 2;
};

const getLegalMoves = (board: string[], index: number, color: 'white' | 'black', currentPlayer: 'white' | 'black', ): number[] => {
  const piece = board[index];
  if (!piece) return [];

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
  const pieceColor = piece[0];
  const pieceType = piece[1];
  const newBoard = [...board];
  const newPlayer = currentPlayer === 'white' ? 'black' : 'white';
  const isInCheck = isCheck(newBoard, newPlayer);
  const hasLegalMove = hasLegalMoves(newBoard, newPlayer);
  let moves: number[] = [];

  if (pieceType === 'K') {
    if (index > 0 && (!board[index - 1] || board[index - 1][0] !== pieceColor)) moves.push(index - 1);
    if (index < board.length - 1 && (!board[index + 1] || board[index + 1][0] !== pieceColor)) moves.push(index + 1);
  } else if (pieceType === 'R') {
    for (let i = index - 1; i >= 0; i--) {
      if (!board[i]) moves.push(i);
      else if (board[i][0] !== pieceColor) {
        moves.push(i);
        break;
      } else break;
    }
    for (let i = index + 1; i < board.length; i++) {
      if (!board[i]) moves.push(i);
      else if (board[i][0] !== pieceColor) {
        moves.push(i);
        break;
      } else break;
    }
  } else if (pieceType === 'N') {
    if (index > 1 && (!board[index - 2] || board[index - 2][0] !== pieceColor)) moves.push(index - 2);
    if (index < board.length - 2 && (!board[index + 2] || board[index + 2][0] !== pieceColor)) moves.push(index + 2);
  }


  return moves;
};

