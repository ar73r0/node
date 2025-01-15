const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
  host: process.env.DB_HOST,
  dialect: process.env.DIALECT,
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
