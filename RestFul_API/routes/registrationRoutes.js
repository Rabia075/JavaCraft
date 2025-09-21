const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController');

// Create
router.post('/', registrationController.createRegistration);

// Read
router.get('/', registrationController.getAllRegistrations);
router.get('/id/:id', registrationController.getRegistrationById);
router.get('/filter', registrationController.getRegistrationByColumn);
router.get('/column', registrationController.getColumnByColumn);

// Update
router.put('/:id', registrationController.updateRegistration);

// Delete
router.delete('/:id', registrationController.deleteRegistration);

module.exports = router;