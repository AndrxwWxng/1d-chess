import Image from "next/image";

type PieceKey = 'K' | 'N' | 'R';

const pieces = {
    K: 'king',
    N: 'knight',
    R: 'rook'
};

type ChessPieceProps = {
    piece: string;
}
const ChessPiece: React.FC<ChessPieceProps> = ({piece}) => {
    if (!piece) return null;
    
    const pieceName = pieces[piece.toUpperCase() as PieceKey];
    const pieceColor = piece === piece.toUpperCase() ? 'white' : 'black';
    
    if (!pieceName) return null;

    return (
        <Image
        src={`/images/chess-pieces/${pieceColor}-${pieceName}.svg`}
        alt={`${pieceColor} ${pieceName}`}
        width={40}
        height={40}
      />
    );
  
};
export default ChessPiece;