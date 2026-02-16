const sequelize = require('./database');
const Users = require('./Users');
const Department = require('./Department');

const models = { Users, Department };

Object.values(models).forEach(model => {
  if (model.associate) {
    model.associate(models);
  }
});

module.exports = { sequelize, ...models };
