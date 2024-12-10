const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path"); // Import nécessaire pour gérer les chemins

const app = express(); // Instanciation de l'application Express
const port = 5000;

// Middleware pour activer CORS
app.use(
  cors({
    origin: "*", // Permet toutes les origines
  })
);

// Connexion à la base de données SQLite
const db = new sqlite3.Database("./db/vehicles.db", (err) => {
  if (err) {
    console.error("Erreur lors de la connexion à la base de données :", err);
  } else {
    console.log("Connexion à la base de données réussie.");
  }
});

// Servir les fichiers statiques du dossier du Frontend
app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

// Importer et utiliser les routes des pièces
const piecesRoutes = require('./routes/pieces'); // Import fichier pieces.js
app.use('/api/pieces', piecesRoutes);

// API pour rechercher un véhicule par plaque
app.get("/api/vehicle/:plateNumber", (req, res) => {
  const plateNumber = req.params.plateNumber;

  db.get(
    `SELECT * FROM vehicles WHERE plate_number = ?`,
    [plateNumber],
    (err, row) => {
      if (err) {
        console.error("Erreur SQL :", err.message);
        res.status(500).json({ error: "Erreur serveur" });
      } else if (row) {
        console.log("Véhicule trouvé :", row);
        res.json(row);
      } else {
        console.log("Aucun véhicule trouvé pour :", plateNumber);
        res.status(404).json({ error: "Véhicule non trouvé" });
      }
    }
  );
});

// Route catch-all pour React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/build/index.html"))
})

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});
