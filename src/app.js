const express = require('express');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models');
const config = require('./config');

const app = express();

app.use(cors(), express.json());
app.use((req, res, next) => { console.log(`${req.method} ${req.url}`); next(); });
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/', (req, res) => res.json({ status: 'ok', message: 'User Management API' }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/departments', require('./routes/departmentRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'production') {
  sequelize.authenticate()
    .then(() => {
      console.log('Database connected');
      app.listen(config.server.port, () => console.log(`Server running on port ${config.server.port}`));
    })
    .catch(err => {
      console.error('Database connection failed:', err);
      process.exit(1);
    });
}

module.exports = app;