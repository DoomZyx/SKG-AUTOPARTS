const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();

// Configuration de la base SQLite
const db = new sqlite3.Database('./catalogueCLIOIV.db');

// Route pour récupérer toutes les pièces
router.get('/', (req, res) => {
  db.all(`SELECT * FROM Vehicules_Pieces`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Route pour récupérer les pièces d'un véhicule spécifique
router.get('/:marque/:modele', (req, res) => {
  const { marque, modele } = req.params;
  db.all(
    `SELECT * FROM Vehicules_Pieces WHERE marque = ? AND modele = ?`,
    [marque, modele],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json(rows);
    }
  );
});

module.exports = router;
