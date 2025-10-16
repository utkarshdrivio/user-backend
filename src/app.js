const express = require('express');
const cors = require('cors');
const { Op } = require('sequelize');
const User = require('./models/Users');
const Department = require('./models/Department');
const sequelize = require('./models/database');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;
    console.log('Search term:', search);
    
    const whereClause = search ? {
      [Op.or]: [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        {role: { [Op.like]: `%${search}%` }},
        {department: { [Op.like]: `%${search}%` }},
        sequelize.where(
          sequelize.fn('CONCAT', sequelize.col('first_name'), ' ', sequelize.col('last_name')),
          { [Op.like]: `%${search}%` }
        )
      ]
    } : {};
    const { count, rows } = await User.findAndCountAll({
      where: whereClause,
      include: [{ 
        model: Department, 
        as: 'department'
      }],
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });
    
    res.json({
      users: rows,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalUsers: count
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Department, as: 'department' }]
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const user = await User.findByPk(req.params.id, {
        include: [{ model: Department, as: 'department' }]
      });
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Get all departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.findAll({
      order: [['name', 'ASC']]
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });