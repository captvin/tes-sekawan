'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tambang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.driver,{
        foreignKey: "penempatan_tambang",
        as: "penempatan_tambang"
      })
    }
  }
  tambang.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tambang',
  });
  return tambang;
};

