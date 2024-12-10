const sqlite3 = require("sqlite3").verbose();

// Connexion à SQLite
const db = new sqlite3.Database("./vehicles.db", (err) => {
  if (err) {
    console.error("Erreur lors de la connexion à SQLite :", err.message);
  } else {
    console.log("Base de données SQLite connectée.");
  }
});

// Créer la table et insérer les données
db.serialize(() => {
  db.run(`DROP TABLE IF EXISTS vehicles;`);
  db.run(`
    CREATE TABLE vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plate_number TEXT UNIQUE NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      cylinder TEXT NOT NULL,
      fuel TEXT NOT NULL,
      powerkw TEXT NOT NULL,
      year INTEGER NOT NULL,
      cover TEXT
    );
  `);
  db.run(`
    INSERT INTO vehicles (plate_number, brand, model, cylinder, fuel, powerkw, year, cover)
    VALUES 
      ('AB-123-CD', 'RENAULT', 'CLIO IV', '1.5 DCI', 'Diesel', '66KW', 2019, '/vehicles/clio4.jpg'),
      ('EF-456-GH', 'PEUGEOT', '208', '1.6 BlueHDI FAP', 'Diesel', '55KW', 2020, '/vehicles/208.jpg'),
      ('IJ-789-KL', 'VOLKSWAGEN', 'GOLF VII', '2.0 TDI CR GTD', 'Diesel', '135KW', 2018, '/vehicles/golf7.jpg'),
      ('MN-234-OP', 'RENAULT', 'MEGANE 3 COUPE', '1.5 DCIF', 'Diesel', '81KW', 2008, '/vehicles/megane3.jpg'),
      ('CR-412-TY', 'FORD', 'FOCUS', '1.8 TDCI', 'Diesel', '85KW', 2008, '/vehicles/focus.jpg');
  `);
});

console.log("Données initiales insérées.");

// Fermer la base de données
db.close((err) => {
  if (err) {
    console.error(
      "Erreur lors de la fermeture de la base de données :",
      err.message
    );
  } else {
    console.log("Connexion à la base de données fermée.");
  }
});
