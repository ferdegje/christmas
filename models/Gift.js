import sequelize from '../lib/db';
import config from '../lib/config';
const { Sequelize, Model, DataTypes } = require('sequelize');

import Beneficiary from './Beneficiary';

class Gift extends Model {}
Gift.init({
  description: DataTypes.STRING,
  url: DataTypes.STRING,
  prix: DataTypes.DECIMAL,
  target_beneficiary: {
   type: Sequelize.INTEGER,
   references: {
     model: Beneficiary,
     key: 'id',
   }
 },
}, { sequelize, modelName: 'gift' });

if (config.SEQUELIZE_SYNC) {
  Gift.sync({force: config.SEQUELIZE_SYNC_FORCE || false});

  (async () => {
    await sequelize.sync();
  })();
}

export default Gift;
