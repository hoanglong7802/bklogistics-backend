const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Create a new profile
router.post('/', profileController.createProfile);

// Get a profile by query
router.get('/', profileController.getProfiles);

// Get a specific profile
router.get('/:id', profileController.getProfileById);

// Update a profile
router.put('/:id', profileController.updateProfile);

// Delete a profile
router.delete('/:id', profileController.deleteProfile);

// Request role registration
router.put('/:id/request-role-registration', profileController.requestRoleRegistration);

module.exports = router;