'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Role.hasMany(models.User, {foreignKey: 'role', sourceKey: 'code', as: 'userData'})
      // define association here
      
    }
  }
  Role.init({
    code: DataTypes.STRING,
    value: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};