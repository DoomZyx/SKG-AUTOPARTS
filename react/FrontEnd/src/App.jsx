import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Catalogue from "./pages/Catalogue/Catalogue";
import SubCategoryDetails from "./components/Catalogue-components/Catalogue-main/SubCategoryDetails/SubCategoryDetails";

import "./App.css";

import "../src/style.scss";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Catalogue" element={<Catalogue />} />
        <Route path="/subcategory/:categoryId/:subCategoryName" element={<SubCategoryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
