'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('departments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      code: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    });

    await queryInterface.addIndex('departments', ['code'], {
      unique: true,
      name: 'departments_code_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('departments');
  }
};
