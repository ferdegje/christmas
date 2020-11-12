import sequelize from '../lib/db';
import config from '../lib/config';
const { Sequelize, Model, DataTypes } = require('sequelize');

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

export default User;
