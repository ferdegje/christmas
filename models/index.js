import sequelize from '../lib/db';
const { Sequelize, Model, DataTypes } = require('sequelize');

export default function reset() {
  (async () => {
    console.log("Sync");
    await sequelize.sync();
  })();
}

// models
export class User extends Model {}
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

export class Beneficiary extends Model {}
Beneficiary.init({
  nickname: DataTypes.TEXT,
  picture: DataTypes.TEXT,
  user: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'identifiant',
    }
  },
}, { sequelize, modelName: 'beneficiary' });

export class Gift extends Model {}
Gift.init({
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  url: DataTypes.STRING,
  prix: DataTypes.DECIMAL,
  user: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'identifiant',
    }
  },
  target_beneficiary: {
   type: Sequelize.INTEGER,
   references: {
     model: Beneficiary,
     key: 'id',
   }
 },
}, { sequelize, modelName: 'gift' });

export class Comment extends Model {}
Comment.init({
  message: DataTypes.STRING,
  user: {
    type: Sequelize.STRING,
    references: {
      model: User,
      key: 'identifiant',
    }
  },
  hidden: DataTypes.BOOLEAN,
  gift: {
    type: Sequelize.INTEGER,
    references: {
      model: Gift,
      key: 'id',
    }
  }
}, { sequelize, modelName: 'gift' });

const User_Beneficiaries = sequelize.define('User_Beneficiaries', {}, { timestamps: false });
Beneficiary.belongsToMany(User, { through: User_Beneficiaries });
User.belongsToMany(Beneficiary, { through: User_Beneficiaries });

User.afterCreate(function(instance, opt) {
  (async () => {
    var a = await Beneficiary.create({
      nickname: instance.nickname,
      user: instance.identifiant
    });
    a.addUser(instance);
  })
})
