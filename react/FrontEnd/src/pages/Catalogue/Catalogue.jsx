import HeaderCat from "../../components/Catalogue-components/Header-cat/HeaderCat.jsx";
import Catalogue_Pieces from "../../components/Catalogue-components/Catalogue-main/Catalogue-main.jsx";
import CatalogueFooter from "../../components/Catalogue-components/CatalogueFooter/Catalogue_footer.jsx";
import { VehicleProvider } from "../../components/Catalogue-components/DataStorage/InfoVehicle.jsx";
import { PiecesProvider } from "../../components/Catalogue-components/DataStorage/PiecesStorage.jsx";
import NavCatalogue from "../../components/Catalogue-components/Catalogue-nav/Catalogue-nav.jsx";
import { useEffect } from "react";

function Catalogue() {
  useEffect(() => {
    // Force le défilement en haut lors du chargement de la page
    window.scrollTo(0, 0);
  }, []);
  return (
    <VehicleProvider>
      <PiecesProvider>
        <div className="catalogue-body">
          <HeaderCat />
          <NavCatalogue />
          <Catalogue_Pieces />
          <CatalogueFooter />
        </div>
      </PiecesProvider>
    </VehicleProvider>
  );
}

export default Catalogue;
