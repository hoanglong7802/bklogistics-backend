const Profile = require("../models/profileModel");

// Create a new profile
exports.createProfile = async (req, res, next) => {
	const {
		walletAddress,
		companyName,
		email,
		shippingAddress,
		deliveryAddress,
		phoneNumber,
		description,
	} = req.body;
	try {
		const profile = new Profile({
			walletAddress: walletAddress,
			companyName: companyName,
			email: email,
			phoneNumber: phoneNumber,
			deliveryAddress: deliveryAddress,
			shippingAddress: shippingAddress,
			phoneNumber: phoneNumber,
			description: description,
			listedMaterials: [],
			listedProducts: [],
			registerDate: Date.now(),
		});

		await profile.save();

		res.status(200).json({
			message: "Successful",
			newProfile: profile,
			timestamp: profile.registerDate,
			path: "/profiles",
			method: "POST",
		});
	} catch (error) {
		res.status(400).json({
			message: "Failed",
			error: error,
			timestamp: Date.now(),
			path: "/profiles",
			method: "POST",
		});
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

exports.getProfiles = async (req, res, next) => {
	try {
		const query = { ...req.query };
		delete query._id;

		if (Object.keys(query).length == 0) {
			query = {};
		}

		const profiles = await Profile.find(query).exec();

		res.json(profiles);
	} catch (error) {
		next(error);
	}
};

exports.getByWalletAddress = async (req, res, next) => {
	const address = req.params.address;
	let matchedProfile;
	try {
		matchedProfile = await Profile.findOne({ walletAddress: address });
		return res.status(200).json({
			message: "Successful",
			profile: matchedProfile,
			timestamp: Date.now(),
			path: `/profiles/address/${address}`,
			method: "GET",
		});
	} catch (err) {
		return res.status(400).json({
			message: "An error occurred",
			error: err,
			timestamp: Date.now(),
			path: `/profiles/address/${address}`,
			method: "GET",
		});
	}
};

// Get a specific profile
exports.getProfileById = async (req, res, next) => {
	try {
		const profileId = req.params.id;
		const profile = await Profile.findById(profileId);

		if (!profile) {
			return res.status(404).json({ error: "Profile not found" });
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
		const {
			wallet_address,
			name,
			email,
			contact_address,
			phone_number,
			listed_materials,
			listed_products,
			registered_date,
		} = req.body;

		const updatedProfile = await Profile.findByIdAndUpdate(
			profileId,
			{
				wallet_address,
				name,
				email,
				contact_address,
				phone_number,
				listed_materials,
				listed_products,
				registered_date,
			},
			{ new: true }
		);

		if (!updatedProfile) {
			return res.status(404).json({ error: "Profile not found" });
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
			return res.status(404).json({ error: "Profile not found" });
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
			return res.status(404).json({ error: "Profile not found" });
		}

		res.json(updatedProfile);
	} catch (error) {
		next(error);
	}
};
