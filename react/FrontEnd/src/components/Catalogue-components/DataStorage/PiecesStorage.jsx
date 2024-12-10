import { createContext, useContext, useState } from "react";

// Création du contexte
const PiecesContext = createContext();

// Fournisseur du contexte
export const PiecesProvider = ({ children }) => {
  const [pieces, setPieces] = useState([]);

  return (
    <PiecesContext.Provider value={{ pieces, setPieces }}>
      {children}
    </PiecesContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const usePieces = () => {
 const contextPieces = useContext(PiecesContext);
 console.log("Contexte actuel:", contextPieces);
 if (!contextPieces) {
   throw new Error(
    "usePieces doit être utilisé à l'intérieur de PiecesProvider."
   );
 }
 return contextPieces;
};