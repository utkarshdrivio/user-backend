const User = require('../models/Users');
const Department = require('../models/Department');
const sequelize = require('../models/database');
const { Op } = require('sequelize');

class UserService {
  async getAllUsers(queryParams) {
    const { page = 1, limit = 10, name, phone, email, role, department, status, joiningDate } = queryParams;
    const offset = (page - 1) * limit;
    
    const whereClause = {};
    
    if (name) {
      whereClause[Op.or] = [
        { first_name: { [Op.like]: `%${name}%` } },
        { last_name: { [Op.like]: `%${name}%` } }
      ];
    }
    if (phone) whereClause.phone = { [Op.like]: `%${phone}%` };
    if (email) whereClause.email = { [Op.like]: `%${email}%` };
    if (role) whereClause.role = { [Op.like]: `%${role}%` };
    if (department) whereClause.dept_id = department;
    if (status !== undefined && status !== '') whereClause.is_active = status === 'true';
    if (joiningDate) whereClause.joining_date = joiningDate;
    
    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      include: [{ model: Department, as: 'department', required: false }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    
    return {
      users: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalUsers: count
    };
  }

  async getUserById(id) {
    return await User.findByPk(id, {
      include: [{ model: Department, as: 'department', required: false }]
    });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(id, userData) {
    await User.update(userData, { where: { id } });
    return await this.getUserById(id);
  }
}

module.exports = new UserService();