const Database = require("better-sqlite3");

// Connexion à SQLite
let db;
try {
  db = new Database("./db/liaisonDonnees.db");
  console.log("Base de données SQLite connectée.");
} catch (err) {
  console.error("Erreur lors de la connexion à SQLite :", err.message);
  process.exit(1);
}

// Générer et insérer automatiquement les relations
try {
  // Requêtes pour récupérer les IDs depuis chaque table
  const vehicle_ids = db.prepare("SELECT id FROM vehicles").all().map(row => row.id); // Table vehicles
  const part_ids = db.prepare("SELECT ID FROM Vehicules_Pieces").all().map(row => row.ID); // Table Vehicules_Pieces
  const categorie_ids = db.prepare("SELECT id FROM categories").all().map(row => row.id); // Table categories

  console.log("IDs des véhicules récupérés :", vehicle_ids);
  console.log("IDs des pièces récupérés :", part_ids);
  console.log("IDs des catégories récupérés :", categorie_ids);

  // Préparer l'insertion
  const insert = db.prepare(`
    INSERT INTO vehicle_parts (vehicle_id, part_id, categorie_id)
    VALUES (?, ?, ?)
  `);

  // Créer les relations automatiquement
  db.transaction(() => {
    vehicle_ids.forEach(vehicle_id => {
      part_ids.forEach(part_id => {
        categorie_ids.forEach(categorie_id => {
          insert.run(vehicle_id, part_id, categorie_id);
        });
      });
    });
  })();

  console.log("Toutes les relations ont été générées et insérées automatiquement.");
} catch (err) {
  console.error("Erreur lors de la génération des relations :", err.message);
} finally {
  // Fermer la base de données
  try {
    db.close();
    console.log("Connexion à la base de données fermée.");
  } catch (err) {
    console.error("Erreur lors de la fermeture de la base de données :", err.message);
  }
}
