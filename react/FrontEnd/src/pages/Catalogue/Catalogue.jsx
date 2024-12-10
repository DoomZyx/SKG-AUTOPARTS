import HeaderCat from "../../components/Catalogue-components/Header-cat/HeaderCat.jsx";
import Catalogue_Pieces from "../../components/Catalogue-components/Catalogue-main/Catalogue-main.jsx";
import { VehicleProvider } from "../../components/Catalogue-components/DataStorage/InfoVehicle.jsx";
import { PiecesProvider } from "../../components/Catalogue-components/DataStorage/PiecesStorage.jsx";
import NavCatalogue from "../../components/Catalogue-components/Catalogue-nav/Catalogue-nav.jsx";

function Catalogue() {
  return (
    <VehicleProvider>
      <PiecesProvider>
      <body className="Catalogue">
        <HeaderCat />
        <NavCatalogue />
        <Catalogue_Pieces />
      </body>
      </PiecesProvider>
    </VehicleProvider>
  );
}

export default Catalogue;
