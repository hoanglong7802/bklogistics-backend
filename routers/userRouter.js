const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', userController.createUser);

// Get all users
router.get('/', userController.getAllUsers);

// Get a specific user
router.get('/:id', userController.getUserById);

// Update a user
router.put('/:id', userController.updateUser);

// Delete a user
router.delete('/:id', userController.deleteUser);

// Get user profile
router.get('/:id', userController.getUserProfile);

// Request role registration
router.put('/:id/request-role-registration', userController.requestRoleRegistration);

module.exports = router;