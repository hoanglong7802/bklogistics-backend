const Profile = require('../models/profileModel');

// Create a new profile
exports.createProfile = async (req, res, next) => {
  try {
    const { address, name, isMember, mail, materialSupply, productManufacture } = req.body;

    const profile = new Profile({
      address,
      name,
      isMember,
      mail,
      materialSupply,
      productManufacture,
    });

    const createdProfile = await profile.save();

    res.status(201).json(createdProfile);
  } catch (error) {
    next(error);
  }
};

// Get all profiles
exports.getAllProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find().exec();

    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

// Get a specific profile
exports.getProfileById = async (req, res, next) => {
  try {
    const profileId = req.params.id;
    const profile = await Profile.findById(profileId);

    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    next(error);
  }
};

// Update a profile
exports.updateProfile = async (req, res, next) => {
  try {
    const profileId = req.params.id;
    const { address, name, isMember, mail, materialSupply, productManufacture } = req.body;

    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      { address, name, isMember, mail, materialSupply, productManufacture },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};

// Delete a profile
exports.deleteProfile = async (req, res, next) => {
  try {
    const profileId = req.params.id;

    const deletedProfile = await Profile.findByIdAndDelete(profileId);

    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};


// Request role registration
exports.requestRoleRegistration = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    // Update role or implement your own validation logic here

    const updatedProfile = await Profile.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    res.json(updatedProfile);
  } catch (error) {
    next(error);
  }
};