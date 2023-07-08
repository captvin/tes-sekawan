'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('units', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nomor_unit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nama_model: {
        allowNull: false,
        type: Sequelize.STRING
      },
      jenis_BBM: {
        type: Sequelize.ENUM('bensin', 'diesel')
      },
      jenis_angkutan: {
        type: Sequelize.ENUM('orang', 'barang')
      },
      status: {
        type: Sequelize.ENUM('tersedia', 'dipakai')
      },
      average_BBM: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      service: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      terakhir_service: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      pemakaian: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('units');
  }
};