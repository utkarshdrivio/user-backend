const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const config = require('./config');

const app = express();

app.use(cors(), express.json());
app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

// Start server
sequelize.authenticate()
  .then(() => {
    console.log('Database connected');
    app.listen(config.server.port, () => console.log(`Server running on port ${config.server.port}`));
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });