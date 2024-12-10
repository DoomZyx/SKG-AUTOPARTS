const fs = require('fs');
const csv = require('csv-parser'); // Pour lire les fichiers CSV
const sqlite3 = require('sqlite3').verbose(); // Pour la base SQLite

// Configuration de la base SQLite
const db = new sqlite3.Database('catalogueCLIOIV.db');

// Création de la table si elle n'existe pas déjà
db.run(`
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
    fournisseur TEXT,
    ref_fournisseur TEXT,
    prix REAL,
    commentaires TEXT
  )
`);

// Fonction pour insérer les données d'une ligne CSV dans la table
function insererDonnees(donnees) {
  db.run(`
    INSERT INTO Vehicules_Pieces 
    (id_vehicule, marque, modele, version, annee, "Catégories", "SubCatégories", type_piece, ref_oe, fournisseur, ref_fournisseur, prix, commentaires)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    donnees.ID_Vehicule, 
    donnees.Marque, 
    donnees.Modèle, 
    donnees['Version/Moteur'], 
    donnees.Année, 
    donnees.Catégories,
    donnees.SubCatégories,
    donnees['Type de Pièce'], 
    donnees['Référence OE'], 
    donnees.Fournisseur, 
    donnees['Référence Fournisseur'], 
    donnees.Prix, 
    donnees.Commentaires
  ], (err) => {
    if (err) {
      console.error(`Erreur lors de l'insertion : ${err.message}`);
    }
  });
}

// Fonction principale pour lire et traiter le fichier CSV
function importerCSV(fichier) {
  console.log(`Importation des données depuis ${fichier}...`);
  
  fs.createReadStream(fichier)
    .pipe(csv())
    .on('data', (row) => {
      insererDonnees(row); // Insérer chaque ligne dans la base
    })
    .on('end', () => {
      console.log('Importation terminée.');
      db.close(); // Fermer la base après l'importation
    })
    .on('error', (err) => {
      console.error(`Erreur lors de la lecture du fichier CSV : ${err.message}`);
    });
}

// Exécuter le script avec le fichier spécifié
const fichierCSV = process.argv[2]; // Exemple : node import_references.js catalogue.csv
if (!fichierCSV) {
  console.error('Veuillez fournir le chemin vers le fichier CSV.');
  process.exit(1);
}

importerCSV(fichierCSV);
