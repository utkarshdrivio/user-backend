const departmentService = require('../services/departmentService');

class DepartmentController {
  async getAllDepartments(req, res) {
    try {
      const departments = await departmentService.getAllDepartments();
      res.json(departments);
    } catch (error) {
      console.error('Departments Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DepartmentController();