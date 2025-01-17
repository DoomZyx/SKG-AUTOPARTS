// Recherche immat selon modele
export const fetchVehicleByPlate = async (plateNumber) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/vehicle/${plateNumber}`
    );
    if (!response.ok) {
      throw new Error("Véhicule non trouvé.");
    }
    const data = await response.json();
    return data; // Retourne les données pour traitement dans les composants
  } catch (err) {
    console.error("Erreur lors de la recherche :", err);
    throw err; // Relance l'erreur pour que l'appelant puisse la gérer
  }
};

// Charger les données depuis l'API lors du montage du composant
export const fetchPieces = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/pieces"); // URL de votre API
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des pièces");
    }
    const data = await response.json(); // Convertit les données en JSON
    return data; // Retourne les pièces
  } catch (error) {
    console.error("Erreur dans fetchPieces :", error);
    throw error; // Relance l'erreur pour la gérer ailleurs
  }
};
