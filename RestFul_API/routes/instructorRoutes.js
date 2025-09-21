const express = require('express');
const router = express.Router();
const instructorController = require('../controllers/instructorController');

// Create Instructor
router.post('/', instructorController.createInstructor);

// Get All Instructors
router.get('/', instructorController.getAllInstructors);

// Get Instructor by ID
router.get('/:id', instructorController.getInstructorById);

// Get Instructors by dynamic column
router.get('/filter/column', instructorController.getInstructorByColumn);

// Get one column from a filtered column
router.get('/filter/select', instructorController.getColumnByColumn);

// Update Instructor by ID (with check)
router.put('/:id', instructorController.updateInstructor);

// Delete Instructor by ID (with check)
router.delete('/:id', instructorController.deleteInstructor);

module.exports = router;