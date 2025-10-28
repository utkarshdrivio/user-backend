const userService = require('../services/userService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const result = await userService.getAllUsers(req.query);
      res.json(result);
    } catch (error) {
      console.error('Users API Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Get User Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.error('Create User Error:', error);
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      console.error('Update User Error:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();