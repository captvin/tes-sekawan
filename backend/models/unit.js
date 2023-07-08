'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan,{
        foreignKey: "unit",
        as: "unit"
      })
      
    }
  }
  unit.init({
    nomor_unit: DataTypes.STRING,
    nama_model: DataTypes.STRING,
    jenis_BBM: DataTypes.ENUM('bensin', 'diesel'),
    jenis_angkutan: DataTypes.ENUM('orang', 'barang'),
    status: DataTypes.ENUM('tersedia', 'dipakai'),
    average_BBM: DataTypes.INTEGER,
    service: DataTypes.INTEGER,
    image: DataTypes.STRING,
    terakhir_service: DataTypes.DATE,
    pemakaian: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'unit',
  });
  return unit;
};

