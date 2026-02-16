require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
    dialect: 'mysql',
    logging: false
  },
  server: {
    port: process.env.PORT || 3001
  },
  upload: {
    destination: 'uploads/',
    maxFileSize: 5 * 1024 * 1024,
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/jpg'],
    allowedDocTypes: ['application/pdf']
  }
};
