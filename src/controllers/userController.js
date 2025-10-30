const userService = require('../services/userService');

const cleanData = (data) => {
  Object.keys(data).forEach(key => {
    if (data[key] === 'undefined' || data[key] === undefined) {
      delete data[key];
    }
  });
  return data;
};

const addFiles = (userData, files) => {
  if (files?.resume) userData.resume = files.resume[0].path;
  if (files?.profilePicture) userData.profile_picture = files.profilePicture[0].path;
};

module.exports = {
  async getAllUsers(req, res) {
    try {
      res.json(await userService.getAllUsers(req.query));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      user ? res.json(user) : res.status(404).json({ error: 'User not found' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async createUser(req, res) {
    try {
      const userData = cleanData({ ...req.body });
      addFiles(userData, req.files);
      res.status(201).json(await userService.createUser(userData));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const userData = cleanData({ ...req.body });
      addFiles(userData, req.files);
      res.json(await userService.updateUser(req.params.id, userData));
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};