const multer = require('multer');
const path = require('path');
const config = require('../config');

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.upload.destination),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValidFile = 
      (file.fieldname === 'resume' && config.upload.allowedDocTypes.includes(file.mimetype)) ||
      (file.fieldname === 'profilePicture' && config.upload.allowedImageTypes.includes(file.mimetype));
    
    cb(isValidFile ? null : new Error('Invalid file type'), isValidFile);
  },
  limits: { fileSize: config.upload.maxFileSize }
});