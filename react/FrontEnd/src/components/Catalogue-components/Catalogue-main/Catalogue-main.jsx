import { useEffect, useState } from "react";
import "../Catalogue-main/_Catalogue-main.scss";
import { useVehicle } from "../DataStorage/InfoVehicle.jsx";
import { fetchPieces } from "../../RequeteAPI/RequeteAPI";
import { useNavigate } from "react-router-dom";

const Catalogue_Pieces = () => {
  const { vehicle } = useVehicle();

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchPieces(); // Charge les données depuis l'API

        // Transformation pour regrouper les catégories et sous-catégories
        const groupedCategories = data.reduce((acc, item) => {
          // Trouver ou créer une catégorie
          let category = acc.find((cat) => cat.name === item.Catégories);
          if (!category) {
            category = { id: acc.length + 1, name: item.Catégories, items: [] };
            acc.push(category);
          }

          // Ajouter la sous-catégorie si elle n'existe pas déjà
          if (!category.items.includes(item.SubCatégories)) {
            category.items.push(item.SubCatégories);
          }

          return acc;
        }, []);

        setCategories(groupedCategories); // Stocke les catégories transformées
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      }
    };

    loadCategories();
  }, []);

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
          {categories.map((category) => (
            <div className="categories" key={category.id}>
              <ul className="category-content">
                <li>
                  <span className="name-category">{category.name}</span>
                </li>
              </ul>
              <div className="sub-category-main">
                {category.items.map((item, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      navigate(`/subcategory/${category.id}/${encodeURIComponent(item)}`)
                    }
                  >
                    <span className="sub-category">{item}</span>
                  </li>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Catalogue_Pieces;
