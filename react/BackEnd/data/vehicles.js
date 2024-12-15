const Database = require("better-sqlite3");

// Connexion à SQLite
let db;
try {
  db = new Database("./db/vehicles.db");
  console.log("Base de données SQLite connectée.");
} catch (err) {
  console.error("Erreur lors de la connexion à SQLite :", err.message);
  process.exit(1); // Arrêter le processus en cas d'erreur
}

// Créer la table et insérer les données
try {
  db.exec(`
    DROP TABLE IF EXISTS vehicles;

    CREATE TABLE vehicles (
      id INTEGER PRIMARY KEY,
      plate_number TEXT UNIQUE NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      cylinder TEXT NOT NULL,
      fuel TEXT NOT NULL,
      powerkw TEXT NOT NULL,
      year INTEGER NOT NULL,
      cover TEXT
    );

    INSERT INTO vehicles (plate_number, brand, model, cylinder, fuel, powerkw, year, cover)
    VALUES 
      ('AB-123-CD', 'RENAULT', 'CLIO IV', '1.5 DCI', 'Diesel', '66KW', 2019, '/vehicles/clio4.jpg'),
      ('EF-456-GH', 'PEUGEOT', '208', '1.6 BlueHDI FAP', 'Diesel', '55KW', 2020, '/vehicles/208.jpg'),
      ('IJ-789-KL', 'VOLKSWAGEN', 'GOLF VII', '2.0 TDI CR GTD', 'Diesel', '135KW', 2018, '/vehicles/golf7.jpg'),
      ('MN-234-OP', 'RENAULT', 'MEGANE 3 COUPE', '1.5 DCIF', 'Diesel', '81KW', 2008, '/vehicles/megane3.jpg'),
      ('CR-412-TY', 'FORD', 'FOCUS', '1.8 TDCI', 'Diesel', '85KW', 2008, '/vehicles/focus.jpg');
  `);

  console.log("Données initiales insérées.");
} catch (err) {
  console.error(
    "Erreur lors de la création ou de l'insertion des données :",
    err.message
  );
} finally {
  // Fermer la base de données
  try {
    db.close();
    console.log("Connexion à la base de données fermée.");
  } catch (err) {
    console.error(
      "Erreur lors de la fermeture de la base de données :",
      err.message
    );
  }
}
