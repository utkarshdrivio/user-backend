const { DataTypes } = require('sequelize');
const sequelize = require('./database');

const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true
  },
  dept_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  joining_date: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  tags: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  profile_color: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  availability_start: {
    type: DataTypes.TIME,
    allowNull: true
  },
  availability_end: {
    type: DataTypes.TIME,
    allowNull: true
  },
  resume: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  profile_picture: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  agreement: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false
});

module.exports = Users;