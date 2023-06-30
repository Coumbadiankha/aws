module.exports = (server) => {
  const authController = require("../controllers/authController");
  const cors = require('cors');




// Route pour l'inscription
server.post('/register', authController.register);

// Route pour la connexion
server.post('/login', authController.login);
};
