import { GameState } from '../context/gameContext';

const SEARCH_DEPTH = 4;

type Move = {
    from: number;
    to: number;
};

type MinimaxResult = {
    score: number;
    move: Move | null;
};

const pieceValues = {
    'K': 900,
    'R': 50,
    'N': 30
};

const evaluateBoard = (board: string[], player: 'white' | 'black'): number => {
    let score = 0;
    const playerColor = player === 'white' ? 'W' : 'B';

    for (let i = 0; i < board.length; i++) {
        const piece = board[i];
        if (piece) {
            const pieceColor = piece[0];
            const pieceType = piece[1];
            const value = pieceValues[pieceType] || 0;
            score += pieceColor === playerColor ? value : -value;
        }
    }

    return score;
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

const isInsufficientMaterial = (board: string[]): boolean => {
  const pieces = board.filter(square => square !== '');
  return pieces.length === 2 && pieces.every(piece => piece[1] === 'K');
};

const minimax = (state: GameState, depth: number, alpha: number, beta: number, isMaximizingPlayer: boolean): MinimaxResult => {
    if (depth === 0 || isInsufficientMaterial(state.board)) {
        return { score: evaluateBoard(state.board, isMaximizingPlayer ? 'white' : 'black'), move: null };
    }

    const moves = getLegalMoves(state.board, isMaximizingPlayer ? 'white' : 'black');

    if (moves.length === 0) {
        if (isCheck(state.board, isMaximizingPlayer ? 'white' : 'black')) {
            return { score: isMaximizingPlayer ? -10000 : 10000, move: null }; // Checkmate
        }
        return { score: 0, move: null }; // Stalemate
    }

    let bestMove: Move | null = null;
    let bestScore = isMaximizingPlayer ? -Infinity : Infinity;

    for (const move of moves) {
        const newBoard = makeMove(state.board, move);
        const { score } = minimax(
            { ...state, board: newBoard, currentPlayer: isMaximizingPlayer ? 'black' : 'white' },
            depth - 1,
            alpha,
            beta,
            !isMaximizingPlayer
        );

        if (isMaximizingPlayer) {
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
            alpha = Math.max(alpha, bestScore);
        } else {
            if (score < bestScore) {
                bestScore = score;
                bestMove = move;
            }
            beta = Math.min(beta, bestScore);
        }

        if (beta <= alpha) {
            break;
        }
    }

    return { score: bestScore, move: bestMove };
};

const getLegalMoves = (board: string[], player: 'white' | 'black'): Move[] => {
    const moves: Move[] = [];
    const playerColor = player === 'white' ? 'W' : 'B';

    for (let i = 0; i < board.length; i++) {
        if (board[i] && board[i][0] === playerColor) {
            const pieceMoves = calculateAvailableMoves(board, i);
            pieceMoves.forEach(to => {
                const testBoard = makeMove(board, { from: i, to });
                if (!isCheck(testBoard, player)) {
                    moves.push({ from: i, to });
                }
            });
        }
    }

    return moves;
};

const makeMove = (board: string[], move: Move): string[] => {
    const newBoard = [...board];
    newBoard[move.to] = newBoard[move.from];
    newBoard[move.from] = '';
    return newBoard;
};

const calculateAvailableMoves = (board: string[], index: number): number[] => {
    const piece = board[index];
    if (!piece) return [];

    const color = piece[0];
    const pieceType = piece[1];
    let moves = [];

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

export const getBotMove = (state: GameState): Move | null => {
  if (isInsufficientMaterial(state.board)) {
      return null; //stalemate
  }
  const { move } = minimax(state, SEARCH_DEPTH, -Infinity, Infinity, false);
  return move;
};