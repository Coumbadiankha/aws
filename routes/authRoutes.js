const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require("jsonwebtoken");
const db = require('../index');
const User = require('../models/User');

const authController = require('../controllers/authController');

const router = express.Router();

const server = express();

server.use(logger('dev'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cookieParser());
server.use(cors());



server.use('/', router);

const hostname = "0.0.0.0";
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`Serveur en cours d'exécution sur http://${hostname}:${port}`);
});


// Route pour l'inscription
router.post('/register', authController.register);

// Route pour la connexion
router.post('/login', authController.login);

module.exports = router;

