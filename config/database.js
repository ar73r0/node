// config/database.js

const { Sequelize } = require('sequelize');

// Initialize Sequelize connection
const sequelize = new Sequelize('tenten', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
};

module.exports = { sequelize, initializeDatabase };