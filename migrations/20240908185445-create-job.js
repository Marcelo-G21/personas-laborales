'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Jobs',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        company: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        initContract: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        finishContract: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        position: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        personId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'People',
            key: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        ifNotExists: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Jobs');
  },
};
