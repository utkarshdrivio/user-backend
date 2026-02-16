'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      first_name: {
        type: Sequelize.STRING(100)
      },
      last_name: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(150),
        unique: true
      },
      phone: {
        type: Sequelize.STRING(100)
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.ENUM('male', 'female', 'other')
      },
      dept_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'departments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      role: {
        type: Sequelize.STRING(100)
      },
      joining_date: {
        type: Sequelize.DATEONLY
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      rating: {
        type: Sequelize.FLOAT
      },
      tags: {
        type: Sequelize.STRING(255)
      },
      profile_color: {
        type: Sequelize.STRING(255)
      },
      availability_start: {
        type: Sequelize.TIME
      },
      availability_end: {
        type: Sequelize.TIME
      },
      resume: {
        type: Sequelize.STRING(255)
      },
      profile_picture: {
        type: Sequelize.STRING(255)
      },
      agreement: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addIndex('users', ['dept_id']);
    await queryInterface.addIndex('users', ['email']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  }
};
