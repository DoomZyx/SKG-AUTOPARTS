import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Home/Homepage";
import Catalogue from "./pages/Catalogue/Catalogue";

import "./App.css";

import "../src/style.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Catalogue" element={<Catalogue />} />
      </Routes>
    </Router>
  );
}

export default App;
