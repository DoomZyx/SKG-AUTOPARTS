const fs = require("fs");
const csv = require("csv-parser"); // Pour lire les fichiers CSV
const Database = require("better-sqlite3"); // Pour la base SQLite

// Configuration de la base SQLite
let db;
try {
  db = new Database("catalogue.db");
  console.log("Base de données SQLite connectée.");
} catch (err) {
  console.error("Erreur lors de la connexion à SQLite :", err.message);
  process.exit(1);
}

// Création de la table si elle n'existe pas déjà
try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS Vehicules_Pieces (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      id_vehicule INTEGER,
      marque TEXT,
      modele TEXT,
      version TEXT,
      annee TEXT,
      Catégories TEXT,
      SubCatégories TEXT,
      type_piece TEXT,
      ref_oe TEXT,
      ref_fournisseur TEXT,
      fournisseur TEXT,
      prix REAL,
      commentaires TEXT
    )
  `);
  console.log("Table Vehicules_Pieces prête.");
} catch (err) {
  console.error("Erreur lors de la création de la table :", err.message);
  process.exit(1);
}

// Fonction pour insérer les données d'une ligne CSV dans la table
function insererDonnees(donnees) {
  try {
    const stmt = db.prepare(`
      INSERT INTO Vehicules_Pieces 
      (id_vehicule, marque, modele, version, annee, "Catégories", "SubCatégories", type_piece, ref_oe, ref_fournisseur, fournisseur, prix, commentaires)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      donnees.ID_Vehicule,
      donnees.Marque,
      donnees.Modèle,
      donnees["Version/Moteur"],
      donnees.Année,
      donnees.Catégories,
      donnees.SubCatégories,
      donnees["Type de Pièce"],
      donnees["Référence OE"],
      donnees["Réferences Fournisseur"],
      donnees.Fournisseur,
      donnees.Prix,
      donnees.Commentaires
    );
  } catch (err) {
    console.error(`Erreur lors de l'insertion : ${err.message}`);
  }
}

// Fonction principale pour lire et traiter le fichier CSV
function importerCSV(fichier) {
  console.log(`Importation des données depuis ${fichier}...`);

  fs.createReadStream(fichier)
    .pipe(csv())
    .on("data", (row) => {
      insererDonnees(row); // Insérer chaque ligne dans la base
    })
    .on("end", () => {
      console.log("Importation terminée.");
      try {
        db.close();
        console.log("Connexion à la base de données fermée.");
      } catch (err) {
        console.error("Erreur lors de la fermeture de la base de données :", err.message);
      }
    })
    .on("error", (err) => {
      console.error(`Erreur lors de la lecture du fichier CSV : ${err.message}`);
    });
}

// Exécuter le script avec le fichier spécifié
const fichierCSV = process.argv[2]; // Exemple : node import_references.js catalogue.csv
if (!fichierCSV) {
  console.error("Veuillez fournir le chemin vers le fichier CSV.");
  process.exit(1);
}

importerCSV(fichierCSV);
