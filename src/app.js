const express = require('express');
const cors = require('cors');
const User = require('./models/Users');
const Department = require('./models/Department');
const sequelize = require('./models/database');
const userRoutes = require('./routes/userRoutes');
const departmentRoutes = require('./routes/departmentRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Setup model associations
const models = { User, Department };
User.associate && User.associate(models);
Department.associate && Department.associate(models);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/departments', departmentRoutes);

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