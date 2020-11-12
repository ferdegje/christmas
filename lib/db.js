import config from './config';

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PWD, {
  dialect: 'mysql',
  host: config.DB_IP,
  dialectOptions: {
    // Your mysql2 options here

  }
})

export default sequelize;
