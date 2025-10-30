const express = require('express');
const cors = require('cors');
const path = require('path');
const User = require('./models/Users');
const Department = require('./models/Department');
const sequelize = require('./models/database');

const app = express();

app.use(cors(), express.json());
app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Model associations
User.associate?.({ User, Department });
Department.associate?.({ User, Department });

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// Start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(3001, () => console.log('Server running on port 3001'));
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });