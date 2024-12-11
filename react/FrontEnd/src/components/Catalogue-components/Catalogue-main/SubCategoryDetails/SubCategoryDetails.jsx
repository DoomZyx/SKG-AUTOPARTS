import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchPieces } from "../../../RequeteAPI/RequeteAPI";

const SubCategoryDetails = () => {
  const { categoryId, subCategoryName } = useParams();
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const loadPieces = async () => {
      try {
        const data = await fetchPieces();
        const filteredPieces = data.filter(
          (piece) =>
            piece.categoryId === parseInt(categoryId) &&
            piece.subCategoryName === decodeURIComponent(subCategoryName)
        );
        setPieces(filteredPieces);
      } catch (error) {
        console.error("Erreur lors du chargement des pièces :", error);
      }
    };

    loadPieces();
  }, [categoryId, subCategoryName]);

  return (
    <div>
      <h1>Pièces pour {decodeURIComponent(subCategoryName)}</h1>
      <ul>
        {pieces.map((piece) => (
          <li key={piece.id}>
            {piece.name} - {piece.reference}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategoryDetails;