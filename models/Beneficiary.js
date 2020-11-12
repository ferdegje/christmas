import sequelize from '../lib/db';
import config from '../lib/config';
import User from './User';

const { Sequelize, Model, DataTypes } = require('sequelize');

class Beneficiary extends Model {}
Beneficiary.init({
  nickname: DataTypes.TEXT,
  picture: DataTypes.TEXT,
}, { sequelize, modelName: 'beneficiary' });

const User_Beneficiaries = sequelize.define('User_Beneficiaries', {}, { timestamps: false });
Beneficiary.belongsToMany(User, { through: User_Beneficiaries });
User.belongsToMany(Beneficiary, { through: User_Beneficiaries });

if (config.SEQUELIZE_SYNC) {
  Beneficiary.sync({force: config.SEQUELIZE_SYNC_FORCE || false});
  (async () => {
    await sequelize.sync();
  })();
}

export default Beneficiary;
