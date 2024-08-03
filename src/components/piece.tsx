import Image from ".next/public/images";

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
        src={`/images/${pieceColor}${pieceName}.svg`}
        alt={`${pieceColor} ${pieceName}`}
        width={100}
        height={100}
      />
    );
  
};
export default ChessPiece;