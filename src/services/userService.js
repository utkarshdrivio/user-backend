const User = require('../models/Users');
const Department = require('../models/Department');
const { Op } = require('sequelize');

const buildWhereClause = (params) => {
  const { name, phone, email, role, department, status, joiningDate } = params;
  const where = {};
  
  if (name) where[Op.or] = [{ first_name: { [Op.like]: `%${name}%` } }, { last_name: { [Op.like]: `%${name}%` } }];
  if (phone) where.phone = { [Op.like]: `%${phone}%` };
  if (email) where.email = { [Op.like]: `%${email}%` };
  if (role) where.role = { [Op.like]: `%${role}%` };
  if (department) where.dept_id = department;
  if (status !== undefined && status !== '') where.is_active = status === 'true';
  if (joiningDate) where.joining_date = joiningDate;
  
  return where;
};

module.exports = {
  async getAllUsers(queryParams) {
    const { page = 1, limit = 10 } = queryParams;
    const { count, rows } = await User.findAndCountAll({
      where: buildWhereClause(queryParams),
      include: [{ model: Department, as: 'department', required: false }],
      limit: parseInt(limit),
      offset: (page - 1) * limit,
      order: [['id', 'DESC']]
    });
    
    return {
      users: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalUsers: count
    };
  },

  async getUserById(id) {
    return User.findByPk(id, {
      include: [{ model: Department, as: 'department', required: false }]
    });
  },

  async createUser(userData) {
    return User.create(userData);
  },

  async updateUser(id, userData) {
    await User.update(userData, { where: { id } });
    return this.getUserById(id);
  }
};