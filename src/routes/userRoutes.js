const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../middlewares/upload');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), userController.createUser);
router.put('/:id', upload.fields([{ name: 'resume', maxCount: 1 }, { name: 'profilePicture', maxCount: 1 }]), userController.updateUser);

module.exports = router;