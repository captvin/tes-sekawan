'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemesanans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pemesan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "pegawais",
          key: "id"
        }
      },
      penyetuju: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: "pegawais",
          key: "id"
        }
      },
      unit: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "units",
          key: "id"
        }
      },
      driver: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "drivers",
          key: "id"
        }
      },
      tambang: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "tambangs",
          key: "id"
        }
      },
      tgl_pesan: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      tgl_disetujui: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      tgl_kembali: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      status_pesan: {
        allowNull: false,
        type: Sequelize.ENUM('menunggu','disetujui','tidak_disetujui')
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
    await queryInterface.dropTable('pemesanans');
  }
};