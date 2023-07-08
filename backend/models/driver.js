'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan,{
        foreignKey: "driver",
        as: "driver"
      })
      this.belongsTo(models.tambang,{
        foreignKey: "penempatan_tambang",
        as: "tambang"
      })
    }
  }
  driver.init({
    nama: DataTypes.STRING,
    penempatan_tambang: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'driver',
  });
  return driver;
};

