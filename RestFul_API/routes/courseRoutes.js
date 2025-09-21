const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.post('/', courseController.createCourse);              // Create
router.get('/', courseController.getAllCourses);              // Get all or filtered
router.get('/filter', courseController.getColumnByFilter);    // Get column by column
router.get('/:id', courseController.getCourseById);           // Get by ID
router.put('/:id', courseController.updateCourse);            // Update by ID
router.delete('/:id', courseController.deleteCourse);         // Delete by ID

module.exports = router;