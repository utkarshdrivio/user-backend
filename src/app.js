const express = require('express');
const cors = require('cors');
const User = require('./models/Users');
const Department = require('./models/Department');
const sequelize = require('./models/database');

const app = express();


app.use(cors());
app.use(express.json());

// Setup relationships
User.belongsTo(Department, { foreignKey: 'dept_id', as: 'department' });
Department.hasMany(User, { foreignKey: 'dept_id', as: 'users' });

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
<<<<<<< HEAD
=======
    const whereClause = search ? {
      [Op.or]: [
        { first_name: { [Op.like]: `%${search}%` } },
        { last_name: { [Op.like]: `%${search}%` } },
        { email: { [Op.like]: `%${search}%` } },
        sequelize.where(
          sequelize.fn('CONCAT', sequelize.col('first_name'), ' ', sequelize.col('last_name')),
          { [Op.like]: `%${search}%` }
        )
      ]
    } : {};
    console.log('Where clause:', JSON.stringify(whereClause, null, 2));

>>>>>>> ee0c9b251fb4f76fddce21af540ba77534f0f06d
    const { count, rows } = await User.findAndCountAll({
      include: [{ 
        model: Department, 
        as: 'department',
        required: false
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
    console.error('Users API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
<<<<<<< HEAD
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Department, as: 'department', required: false }]
=======
    console.log('Fetching user with ID:', req.params.id);
    const user = await User.findOne({
      where: { id: req.params.id },
      include: [{ model: Department, as: 'department' }]
>>>>>>> ee0c9b251fb4f76fddce21af540ba77534f0f06d
    });
    console.log('Found user:', user ? 'Yes' : 'No');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Get User Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create user
app.post('/api/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error('Create User Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update user
app.put('/api/users/:id', async (req, res) => {
  try {
    await User.update(req.body, {
      where: { id: req.params.id }
    });
    
    const user = await User.findByPk(req.params.id, {
      include: [{ model: Department, as: 'department', required: false }]
    });
    
    res.json(user);
  } catch (error) {
    console.error('Update User Error:', error);
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
    console.error('Departments Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

// 👇 Add this at the very end of the file
module.exports = app;