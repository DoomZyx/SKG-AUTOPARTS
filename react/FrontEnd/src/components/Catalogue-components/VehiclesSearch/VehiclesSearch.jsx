import { useState } from "react";
import Modal from "../../Modal/Modal";
import "../VehiclesSearch/_VehiclesSearch.scss";

const VehicleSearch = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);


  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/vehicle/${plateNumber}`
      );
      if (response.ok) {
        const data = await response.json();
        setVehicle(data); // Stocke les données du véhicule
        setError(""); // Réinitialise les erreurs
        setModalOpen(false); // Ferme la modale après recherche
      } else {
        setVehicle(null);
        setError("Véhicule non trouvé.");
      }
    } catch (err) {
      console.error("Erreur lors de la recherche :", err);
      setError("Erreur lors de la recherche. Vérifiez le serveur.");
    }
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Rechercher une plaque</button>

      {/* Modale */}
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <h2>Rechercher un véhicule</h2>
        <input
          type="text"
          placeholder="Entrez une plaque (ex: AB-123-CD)"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />
        <button onClick={handleSearch}>Rechercher</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal>

      {/* Résultats de la recherche */}
      {vehicle && (
        <div>
          <h3>Informations sur le véhicule :</h3>
          <p>Marque : {vehicle.brand}</p>
          <p>Modèle : {vehicle.model}</p>
          <p>Cylindrée : {vehicle.cylinder}</p>
          <p>Carburant : {vehicle.fuel}</p>
          <p>Puissance : {vehicle.powerkw}</p>
          <p>Année : {vehicle.year}</p>
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;
