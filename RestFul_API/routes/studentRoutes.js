const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// ==========================
// POST - Add new student
router.post('/', studentController.createStudent); // Add student

// ==========================
// GET - Get all students
router.get('/', studentController.getAllStudents); // Get all

// ==========================
// GET - Get full student record by any column
// Example: /api/students/by-column?filter_by=email&filter_value=abc@gmail.com
router.get('/by-column', studentController.getStudentByColumn); // Get full record by column

// ==========================
// GET - Get specific column by any column
// Example: /api/students/column?filter_by=email&filter_value=abc@gmail.com&select=full_name
router.get('/column', studentController.getStudentColumnByColumn); // Get 1 column by 1 column

// ==========================
// GET - Get student by ID
router.get('/:id', studentController.getStudentById); // Get by ID

// ==========================
// PUT - Update student by ID
router.put('/:id', studentController.updateStudent); // Update

// ==========================
// DELETE - Delete student by ID
router.delete('/:id', studentController.deleteStudent); // Delete

module.exports = router;