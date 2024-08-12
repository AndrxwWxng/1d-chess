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
