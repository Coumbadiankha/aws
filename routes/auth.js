const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require("jsonwebtoken");
const db = require('../index');
const User = require('../models/User');

const router = express.Router();

const server = express();

server.use(logger('dev'));
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cookieParser());
server.use(cors());

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = {
      username,
      password
    };
    const user = await User.create(newUser);
    console.log('User created successfully!', user);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'inscription' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'Nom d\'utilisateur incorrect' });
    }

    const isValidPassword = await user.isValidPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, 'secret_key');

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'authentification' });
  }
});

server.use('/', router);

const hostname = "0.0.0.0";
const port = 3000;
server.listen(port, hostname, () => {
  console.log(`Serveur en cours d'exécution sur http://${hostname}:${port}`);
});

module.exports = router;
