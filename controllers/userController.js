const User = require('../models/userModel');

// Create a new user
exports.createUser = (req, res) => {
  const { name, email, age } = req.body;

  const user = new User({
    name,
    email,
    age
  });

  user.save((err, newUser) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to create user' });
    } else {
      res.status(201).json(newUser);
    }
  });
};

// Get all users
exports.getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve users' });
    } else {
      res.json(users);
    }
  });
};

// Get a specific user by ID
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  User.findById(userId, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve user' });
    } else if (!user) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  });
};

// Update a user
exports.updateUser = (req, res) => {
  const userId = req.params.id;
  const { name, email, age } = req.body;

  User.findByIdAndUpdate(userId, { name, email, age }, { new: true }, (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update user' });
    } else if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json(updatedUser);
    }
  });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  User.findByIdAndRemove(userId, (err, removedUser) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to delete user' });
    } else if (!removedUser) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.json({ message: 'User deleted successfully' });
    }
  });
};
