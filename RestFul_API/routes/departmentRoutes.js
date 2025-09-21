const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');

// Route to create department
router.post('/', departmentController.createDepartment);

// Route to get all departments — FIXED!
router.get('/', departmentController.getDepartments);

// Route to filter department data based on specific column filters
router.get('/filter', departmentController.getColumnByFilter);

// Route to get department by ID — ADD THIS IF MISSING
router.get('/:id', departmentController.getDepartmentById);

// Route to update department
router.put('/:id', departmentController.updateDepartment);

// Route to delete department
router.delete('/:id', departmentController.deleteDepartment);

module.exports = router;