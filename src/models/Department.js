const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'departments',
  timestamps: false
});

module.exports = Department;