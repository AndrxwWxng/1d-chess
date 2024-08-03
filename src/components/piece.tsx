import { BookKey } from "lucide-react";
import Image from "next/image";

type PieceKey = 'WK' | 'WN' | 'WR' | 'BK' | 'BN' | 'BR' ;

const pieces = {
    WK: 'whiteking',
    WN: 'whiteknight',
    WR: 'whiterook',
    BK: 'blackking',
    BN: 'blackknight',
    BR: 'blackrook',
};

type ChessPieceProps = {
    piece: string;
}
const ChessPiece: React.FC<ChessPieceProps> = ({piece}) => {
    if (!piece) return null;
    
    const pieceName = pieces[piece.toUpperCase() as PieceKey]
    //const pieceColor = piece === piece.toUpperCase() ? 'white' : 'black';
    
    if (!pieceName) return null;

    return (
        <Image
        src={`/images/${pieceName}.svg`}
        alt={`${pieceName}`}
        width={100}
        height={100}
      />
    );
  
};
export default ChessPiece;