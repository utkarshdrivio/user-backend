const Department = require('../models/Department');

class DepartmentService {
  async getAllDepartments() {
    return await Department.findAll({
      order: [['name', 'ASC']]
    });
  }
}

module.exports = new DepartmentService();