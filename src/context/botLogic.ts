import { GameState } from '../context/gameContext';

export const getBotMove = (state: GameState): number | null => {
  const { board, currentPlayer } = state;
  const botColor = currentPlayer === 'white' ? 'black' : 'white';
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

const getLegalMoves = (board: string[], index: number, color: 'white' | 'black'): number[] => {
  const piece = board[index];
  if (!piece) return [];

  const pieceColor = piece[0];
  const pieceType = piece[1];
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