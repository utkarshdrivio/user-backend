const express = require('express');
const departmentController = require('../controllers/departmentController');

const router = express.Router();

router.get('/', departmentController.getAllDepartments);

module.exports = router;