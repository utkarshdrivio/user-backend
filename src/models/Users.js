const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Users = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    email: {
      type: DataTypes.STRING(150),
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(100),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
    },
    dept_id: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING(100),
    },
    joining_date: {
      type: DataTypes.DATEONLY,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 5,
      },
    },
    tags: {
      type: DataTypes.STRING(255),
    },
    profile_color: {
      type: DataTypes.STRING(255),
    },
    availability_start: {
      type: DataTypes.TIME,
    },
    availability_end: {
      type: DataTypes.TIME,
    },
    resume: {
      type: DataTypes.STRING(255),
    },
    profile_picture: {
      type: DataTypes.STRING(255),
    },
    agreement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

Users.associate = (models) => {
  Users.belongsTo(models.Department, {
    foreignKey: "dept_id",
    as: "department",
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });
};

module.exports = Users;