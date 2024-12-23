import { useState } from "react";
import { Link } from "react-router-dom";
import { ModalCategories } from "../../Modal/Modal";
import "../Catalogue-nav/_Catalogue-nav.scss";
import { categories } from "../../../data/categories";
import  promodisque  from "../../../assets/promodisque.png";

function NavCatalogue() {
  const [isPieceModal, setPieceModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showImage, setShowImage] = useState(true); // Nouvel état pour gérer l'affichage de l'image

  const handleCategoryClick = (categoryId) => {
    // Active ou désactive une catégorie
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setShowImage(false); // Cache l'image lorsque l'utilisateur clique sur une catégorie
  };

  const handleOpenPiecesModal = () => setPieceModal(true);
  const handleClosePiecesModal = () => {
    setPieceModal(false);
    setActiveCategory(null); // Réinitialise les sous-catégories
    setShowImage(true); // Réaffiche l'image lorsque la modal est fermée
  };

  return (
    <nav>
      <div className="nav-menu">
        <div className="nav-categories">
          <ul>
            <li>
              <div
                className="pieces-modal"
                onClick={handleOpenPiecesModal}
                style={{ cursor: "pointer" }}
              >
                <span className="pieces-nav">Pièces auto</span>
              </div>
            </li>
            <li>
              <Link to="/">Huile Moteur</Link>
            </li>
          </ul>
        </div>
      </div>
      <ModalCategories isOpen={isPieceModal} onClose={handleClosePiecesModal}>
        <h3 className="modal-title">Nos catégories</h3>
        <div className="modal-container">
          {/* Colonne de gauche : Catégories principales */}
          <div className="modal-left">
            <ul className="category-list">
              {categories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={
                    activeCategory === category.id
                      ? "category-item active"
                      : "category-item"
                  }
                >
                  <span className="category-name">{category.name}</span>
                  <span className="category-arrow">{">"}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne de droite : Sous-catégories ou image */}
          <div className="modal-right">
            {showImage ? (
              <div>
                <img
                  src={ promodisque }
                  alt="Promotion disques"
                  className="promo-image"
                />
              </div>
            ) : activeCategory ? (
              <>
                <ul className="sub-category-list">
                  {categories
                    .find((category) => category.id === activeCategory)
                    .items.map((item, index) => (
                      <li key={index} className="sub-category-item">
                        {item}
                      </li>
                    ))}
                </ul>
              </>
            ) : null}
          </div>
        </div>
      </ModalCategories>
    </nav>
  );
}

export default NavCatalogue;
