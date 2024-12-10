import { useState } from "react";
import Modal from "../../Modal/Modal";
import "../VehiclesSearch/_VehiclesSearch.scss";
import { fetchVehicleByPlate } from "../../RequeteAPI/RequeteAPI";
import { useVehicle } from "../DataStorage/InfoVehicle.jsx";

function HeaderCat() {
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [plateNumber, setPlateNumber] = useState("");
  const { vehicle, setVehicle } = useVehicle();
  console.log("Véhicule actuel :", vehicle);
  const [error, setError] = useState("");

  // Ouvrir et fermer la modale de recherche
  const handleOpenSearchModal = () => setSearchModalOpen(true);
  const handleCloseSearchModal = () => {
    setSearchModalOpen(false);
    setPlateNumber(""); // Réinitialise la saisie
    setError("");
  };

  // Ouvrir et fermer la modale d'informations
  const handleOpenInfoModal = () => setInfoModalOpen(true);
  const handleCloseInfoModal = () => setInfoModalOpen(false);

  // Effectuer une recherche
  const handleSearch = async () => {
    try {
      const data = await fetchVehicleByPlate(plateNumber);
      setVehicle(data);
      setError("");
      setSearchModalOpen(false);
      handleOpenInfoModal();
    } catch (err) {
      setVehicle(null);
      setError(err.message || "Erreur lors de la recherche.");
    }
  };

  // Gérer la saisie de la plaque et ajouter le format
  const handlePlateChange = (event) => {
    let inputValue = event.target.value.toUpperCase(); // Convertit en majuscules
    inputValue = inputValue.replace(/[^A-Z0-9]/g, ""); // Supprime caractères invalides

    if (inputValue.length > 2) {
      inputValue = inputValue.slice(0, 2) + "-" + inputValue.slice(2);
    }
    if (inputValue.length > 6) {
      inputValue = inputValue.slice(0, 6) + "-" + inputValue.slice(6, 9);
    }

    setPlateNumber(inputValue.slice(0, 9)); // Met à jour le champ formaté
  };

  return (
    <header>
      <div className="Header-container">
        <h1 className="Title">SKG AUTOPARTS</h1>

        <div className="search-bar">
          <label htmlFor="reference"></label>
          <input
            className="search-cat"
            type="search"
            id="reference"
            placeholder="Recherche un produit, une référence..."
          />
        </div>

        <div className="user-section">
          <div
            className="vehicules"
            onClick={handleOpenSearchModal}
            style={{ cursor: "pointer" }}
          >
            <i className="fa-solid fa-car"></i>
            <span>Mon véhicule</span>
          </div>

          <div className="icon-account">
            <i className="fa-solid fa-user"></i>
            <span>Mon compte</span>
          </div>

          <div className="Cart">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>Panier</span>
          </div>
        </div>
      </div>

      {/* Modale pour la recherche */}
      {isSearchModalOpen && (
        <Modal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal}>
          <h2 className="search-title">Rechercher un véhicule</h2>
          <div className="modal-search-container">
            <div className="plate-container">
              <input
                className="plate-input"
                type="text"
                value={plateNumber}
                onChange={handlePlateChange}
                maxLength="9"
                placeholder="AB-123-CD"
              />
            </div>
            <button className="button-search-immat" onClick={handleSearch}>
              Rechercher
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </Modal>
      )}

      {/* Modale d'informations */}
      {isInfoModalOpen && vehicle && (
        <Modal isOpen={isInfoModalOpen} onClose={handleCloseInfoModal}>
          <h2 className="info-title">Informations sur le véhicule</h2>
          <div className="modal-info-container">
            {console.log("Valeur de vehicle.cover :", vehicle.cover)}{" "}
            {console.log("Valeur actuelle de vehicle :", vehicle)}
            <img
              src={`http://localhost:5000${vehicle.cover}`}
              alt={`${vehicle.brand} ${vehicle.model}`}
              className="vehicle-image"
            />
            <p className="modal-brand">{vehicle.brand}</p>
            <p className="modal-model">{vehicle.model}</p>
            <p className="modal-year">{vehicle.year}</p>
            <p className="modal-cylinder">{vehicle.cylinder}</p>
            <p className="modal-fuel">{vehicle.fuel}</p>
            <p className="modal-power">{vehicle.powerkw}</p>
          </div>
        </Modal>
      )}
    </header>
  );
}
export default HeaderCat;
