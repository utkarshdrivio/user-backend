const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: "departments",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["code"],
      },
    ],
  },
);

Department.associate = (models) => {
  Department.hasMany(models.Users, {
    foreignKey: "dept_id",
    as: "users",
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });
};

module.exports = Department;