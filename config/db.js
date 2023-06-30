const mysql = require('mysql');

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: 'tpaws.cp3knxgiemoe.eu-west-3.rds.amazonaws.com', // L'adresse du serveur MySQL
  user: 'root', // Le nom d'utilisateur MySQL
  password: 'amilgaoul1C+', // Le mot de passe MySQL
  database: 'tpaws' // Le nom de la base de données MySQL
});

// Établir la connexion à la base de données
connection.connect((error) => {
  if (error) {
    console.error('Erreur de connexion à la base de données :', error);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Exporter la connexion pour l'utiliser dans d'autres fichiers
module.exports = connection;
