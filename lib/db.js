import config from './config';
import mysql2 from 'mysql2';

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PWD, {
  dialect: 'mysql',
  host: config.DB_IP,
  dialectModule: mysql2,
  dialectOptions: {
    // Your mysql2 options here

  }
})

export default sequelize;
