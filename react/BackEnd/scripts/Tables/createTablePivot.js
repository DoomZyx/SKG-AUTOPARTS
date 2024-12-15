const Database = require("better-sqlite3");

// Connexion à SQLite
let db;
try {
  db = new Database("./db/liaisonDonnees.db"); // Utilisez la base correcte
  console.log("Base de données SQLite connectée.");
} catch (err) {
  console.error("Erreur lors de la connexion à SQLite :", err.message);
  process.exit(1);
}

// Créer la table pivot
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS vehicle_parts (
      vehicle_id INTEGER NOT NULL,         -- ID du véhicule
      part_id INTEGER NOT NULL,            -- ID de la pièce
      categorie_id INTEGER NOT NULL,       -- ID de la catégorie
      PRIMARY KEY (vehicle_id, part_id, categorie_id),
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE CASCADE,
      FOREIGN KEY (part_id) REFERENCES Vehicules_Pieces(ID) ON DELETE CASCADE,
      FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
    );
  `);

  console.log("Table 'vehicle_parts' créée avec succès.");
} catch (err) {
  console.error("Erreur lors de la création de la table pivot :", err.message);
} finally {
  try {
    db.close();
    console.log("Connexion à la base de données fermée.");
  } catch (err) {
    console.error("Erreur lors de la fermeture de la base de données :", err.message);
  }
}
