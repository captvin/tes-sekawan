'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.pemesanan,{
        foreignKey: "pemesan",
        as: "pesan"
      })
      this.hasMany(models.pemesanan,{
        foreignKey: "penyetuju",
        as: "setuju"
      })
      this.belongsTo(models.kantor,{
        foreignKey: "penempatan",
        as: "kantor"
      })
    }
  }
  pegawai.init({
    nama: DataTypes.STRING,
    penempatan: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'official','superadmin')
  }, {
    sequelize,
    modelName: 'pegawai',
  });
  return pegawai;
};

