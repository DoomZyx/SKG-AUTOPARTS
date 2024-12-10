const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
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
let db;
try {
  db = new Database("./db/vehicles.db");
  console.log("Connected to SQLite database.");
} catch (err) {
  console.error("Error connecting to SQLite database:", err);
  process.exit(1); // Quitte le processus si la connexion échoue
}

// Servir les fichiers statiques du dossier du Frontend
app.use(express.static(path.join(__dirname, "../FrontEnd/dist")));

// Importer et utiliser les routes des pièces
const piecesRoutes = require("./routes/pieces"); // Import fichier pieces.js
app.use("/api/pieces", piecesRoutes);

// Route pour rechercher un véhicule par plaque
app.get("/api/vehicle/:plateNumber", (req, res) => {
  const plateNumber = req.params.plateNumber;

  try {
    const stmt = db.prepare(`SELECT * FROM vehicles WHERE plate_number = ?`);
    const row = stmt.get(plateNumber);

    if (row) {
      console.log("Véhicule trouvé :", row);
      res.json(row); // Réponse avec les données trouvées
    } else {
      console.log("Aucun véhicule trouvé pour :", plateNumber);
      res.status(404).json({ error: "Véhicule non trouvé" });
    }
  } catch (err) {
    console.error("Erreur SQL :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// Route catch-all pour React (Frontend)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../FrontEnd/dist/index.html"));
});

// Middleware pour les erreurs
app.use((err, req, res, next) => {
  console.error("Erreur serveur :", err.stack);
  res.status(500).json({ error: "Erreur interne du serveur" });
});

// Lancer le serveur
app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
