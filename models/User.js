import sequelize from '../lib/db';
import config from '../lib/config';
const { Sequelize, Model, DataTypes } = require('sequelize');

class User extends Model {}
User.init({
  identifiant: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  given_name: DataTypes.STRING,
  family_name: DataTypes.STRING,
  nickname: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  locale: DataTypes.STRING,
  picture: DataTypes.TEXT
}, { sequelize, modelName: 'user' });

if (config.SEQUELIZE_SYNC) {
  User.sync({force: config.SEQUELIZE_SYNC_FORCE || false});

  (async () => {
    await sequelize.sync();
  })();
}

export default User;
