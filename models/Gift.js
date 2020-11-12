import sequelize from '../lib/db';
import config from '../lib/config';
const { Sequelize, Model, DataTypes } = require('sequelize');

class Gift extends Model {}
Gift.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'gift' });

if (config.SEQUELIZE_SYNC) {
  Gift.sync({force: config.SEQUELIZE_SYNC_FORCE || false});

  (async () => {
    await sequelize.sync();
    const jane = await Gift.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
  })();
}

export default Gift;
