const fs = require("fs");
const Database = require("better-sqlite3");

// Vérification du fichier CSV
if (process.argv.length < 3) {
  console.error("Usage: node import_categories.js <path_to_csv_file>");
  process.exit(1);
}

const csvFilePath = process.argv[2];

// Connexion à SQLite
let db;
try {
  db = new Database("./db/categories.db");
  console.log("Base de données SQLite connectée.");
} catch (err) {
  console.error("Erreur lors de la connexion à SQLite :", err.message);
  process.exit(1);
}

// Lire le fichier CSV
const readCSV = (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  return data
    .split("\n")
    .slice(1)
    .filter(line => line.trim()) // Ignorer les lignes vides
    .map(line => line.split(","));
};

const categories = readCSV(csvFilePath);

// Créer la table des catégories
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      image TEXT
    );
  `);
  console.log("Table 'categories' créée avec succès.");

  // Insérer les catégories dans la table
  const insert = db.prepare(`
    INSERT OR REPLACE INTO categories (id, name, image) VALUES (?, ?, ?)
  `);

  db.transaction(() => {
    categories.forEach(([id, name, image]) => {
      insert.run(parseInt(id), name.trim(), image.trim());
    });
  })();

  console.log("Données importées avec succès dans la table 'categories'.");
} catch (err) {
  console.error("Erreur lors de la création ou de l'insertion des données :", err.message);
} finally {
  try {
    db.close();
    console.log("Connexion à la base de données fermée.");
  } catch (err) {
    console.error("Erreur lors de la fermeture de la base de données :", err.message);
  }
}
