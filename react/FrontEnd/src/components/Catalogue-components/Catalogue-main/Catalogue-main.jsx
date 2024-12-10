import { useEffect } from "react";
import "../Catalogue-main/_Catalogue-main.scss";
import { useVehicle } from "../DataStorage/InfoVehicle.jsx";
import { fetchPieces } from "../../RequeteAPI/RequeteAPI";
import { usePieces } from "../DataStorage/PiecesStorage";
import { categories } from "../../../data/categories";

const Catalogue_Pieces = () => {
  const { vehicle } = useVehicle();
  const { pieces, setPieces } = usePieces();

  useEffect(() => {
    const loadPieces = async () => {
      try {
        const data = await fetchPieces(); // Appelle l'API pour récupérer les pièces
        setPieces(data); // Stocke les pièces dans le contexte
      } catch (error) {
        console.error("Erreur lors du chargement des pièces :", error);
      }
    };

    loadPieces(); // Charge les pièces au chargement du composant
  }, [setPieces]);

  pieces;

  return (
    <>
      {vehicle && (
        <div className="info-container">
          <img
            src={`http://localhost:5000${vehicle.cover}`}
            alt={`${vehicle.brand} ${vehicle.model}`}
          />
          <div className="nav-info-container">
            <div className="brand-model">
              <p className="nav-brand">{vehicle.brand}</p>
              <p className="nav-model">{vehicle.model}</p>
            </div>
            <div className="more-info">
              <p className="nav-cylinder">{vehicle.cylinder}</p>
              <p className="nav-powerkw">{vehicle.powerkw}</p>
              <p className="nav-year">{vehicle.year}</p>
            </div>
          </div>
        </div>
      )}

      <main>
        <div className="categories-main">

          <div className="categories">
            <ul className="category-content">
              {categories
                .filter((category) => category.id === 1)
                .map((category) => (
                  <li key={category.id}>
                    <span className="name-category">{category.name}</span>
                  </li>
                ))}
              {categories
                .find((category) => category.id === 1)
                .items.map((item, index) => (
                  <li key={index}>
                    <span className="sub-category">{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="categories">
            <ul className="category-content">
              {categories
                .filter((category) => category.id === 2)
                .map((category) => (
                  <li key={category.id}>
                    <span className="name-category">{category.name}</span>
                  </li>
                ))}
                {categories
                .find((category) => category.id === 2)
                .items.map((item, index) => (
                  <li key={index}>
                    <span className="sub-category">{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="categories">
            <ul className="category-content">
              {categories
                .filter((category) => category.id === 3)
                .map((category) => (
                  <li key={category.id}>
                    <span className="name-category">{category.name}</span>
                  </li>
                ))}
                {categories
                .find((category) => category.id === 3)
                .items.map((item, index) => (
                  <li key={index}>
                    <span className="sub-category">{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="categories">
            <ul className="category-content">
              {categories
                .filter((category) => category.id === 4)
                .map((category) => (
                  <li key={category.id}>
                    <span className="name-category">{category.name}</span>
                  </li>
                ))}
                {categories
                .find((category) => category.id === 4)
                .items.map((item, index) => (
                  <li key={index}>
                    <span className="sub-category">{item}</span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="categories">
            <ul className="category-content">
              {categories
                .filter((category) => category.id === 5)
                .map((category) => (
                  <li key={category.id}>
                    <span className="name-category">{category.name}</span>
                  </li>
                ))}
                {categories
                .find((category) => category.id === 5)
                .items.map((item, index) => (
                  <li key={index}>
                    <span className="sub-category">{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};

export default Catalogue_Pieces;
