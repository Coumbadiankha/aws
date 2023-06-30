const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fonction d'inscription
async function register(req, res) {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Ce nom d\'utilisateur est déjà pris.' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const user = new User({
      username,
      password: hashedPassword
    });

    // Enregistrer l'utilisateur dans la base de données
    await user.save();

    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de l\'inscription.' });
  }
}

// Fonction de connexion
async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Vérifier le mot de passe
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect.' });
    }

    // Générer un jeton JWT
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Une erreur s\'est produite lors de la connexion.' });
  }
}

module.exports = {
  register,
  login
};
