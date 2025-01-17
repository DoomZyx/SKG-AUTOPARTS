const express = require("express");
const Database = require("better-sqlite3");
const router = express.Router();

// Configuration de la base SQLite avec better-sqlite3
const db = new Database("./db/catalogue.db");

// Route pour récupérer toutes les pièces
router.get("/", (req, res) => {
  try {
    const rows = db.prepare(`SELECT * FROM Vehicules_Pieces`).all();
    res.json(rows); // Retourne toutes les lignes
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route pour récupérer les pièces d'un véhicule spécifique
router.get("/:marque/:modele", (req, res) => {
  const { marque, modele } = req.params;
  try {
    const rows = db
      .prepare(`SELECT * FROM Vehicules_Pieces WHERE marque = ? AND modele = ?`)
      .all(marque, modele); // Exécute la requête avec les paramètres
    res.json(rows); // Retourne les lignes correspondantes
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
