'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.pegawai,{
        foreignKey: "pemesan",
        as: "pesan"
      })
      this.belongsTo(models.pegawai,{
        foreignKey: "penyetuju",
        as: "setuju"
      })
      this.belongsTo(models.unit,{
        foreignKey: "unit",
        as: "vehicle"
      })
      this.belongsTo(models.driver,{
        foreignKey: "driver",
        as: "sopir"
      })
      this.belongsTo(models.tambang,{
        foreignKey: "tambang",
        as: "mine"
      })
    }
  }
  pemesanan.init({
    pemesan: DataTypes.INTEGER,
    penyetuju: DataTypes.INTEGER,
    unit: DataTypes.INTEGER,
    driver: DataTypes.INTEGER,
    tambang: DataTypes.INTEGER,
    tgl_pesan: DataTypes.DATEONLY,
    tgl_disetujui: DataTypes.DATEONLY,
    tgl_kembali: DataTypes.DATEONLY,
    status_pesan: DataTypes.ENUM('menunggu','disetujui', 'tidak_disetujui')
  }, {
    sequelize,
    modelName: 'pemesanan',
  });
  return pemesanan;
};