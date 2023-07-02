const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
  process.env.DB_DATABASE, 
  process.env.DB_USERNAME, 
  process.env.DB_PASSWORD, 
  { 
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql' 
  }
);

db.authenticate().then(() => {
  console.log('Connexion avec succès.');
}).catch((error) => {
  console.error('Impossible de se connecter à la base de données : ', error);
});

module.exports = db;