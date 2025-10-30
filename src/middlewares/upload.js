const multer = require('multer');
const path = require('path');

module.exports = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const isValidFile = 
      (file.fieldname === 'resume' && file.mimetype === 'application/pdf') ||
      (file.fieldname === 'profilePicture' && file.mimetype.startsWith('image/'));
    
    cb(isValidFile ? null : new Error('Invalid file type'), isValidFile);
  },
  limits: { fileSize: 5 * 1024 * 1024 }
});