import { createContext, useContext, useState } from "react";

// Création du contexte
const VehicleContext = createContext();

// Fournisseur de contexte
export const VehicleProvider = ({ children }) => {
  const [vehicle, setVehicle] = useState(null); // Stocke les données du véhicule

  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useVehicle = () => {
  const context = useContext(VehicleContext);
  console.log("Contexte actuel :", context);
  if (!context) {
    throw new Error(
      "useVehicle doit être utilisé à l'intérieur de VehicleProvider."
    );
  }
  return context;
};
