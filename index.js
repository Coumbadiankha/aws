const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Database connection
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('tpaws', 'root', 'amilgaoul1C+', {
  host: 'tpaws.cp3knxgiemoe.eu-west-3.rds.amazonaws.com',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Define User model
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

// Routes
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

// Sync models with the database and start the server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync models:', error);
  });

module.exports = {
  sequelize,
  User
};
