const Product = require("../models/productModel");
const Profile = require("../models/profileModel");
const Material = require("../models/materialModel");

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
		profileImage,
	} = req.body;
	try {
		const profile = new Profile({
			walletAddress: walletAddress,
			companyName: companyName,
			email: email,
			profileImage: profileImage,
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

exports.addListed = async (req, res) => {
	const address = req.params.address;
	const materialId = req.body.materialId;
	const productId = req.body.productId;
	let matchedProfile;
	try {
		matchedProfile = await Profile.findOne({ walletAddress: address });
		if (materialId) matchedProfile.listedMaterials.push(Number(materialId));
		if (productId) matchedProfile.listedProducts.push(Number(productId));
		await matchedProfile.save();
		return res.status(200).json({
			message: "Successful",
			addedMaterial: materialId,
			address: address,
			// profile: matchedProfile,
			timestamp: Date.now(),
			path: `/profiles/${address}/list`,
			method: "PUT",
		});
	} catch (err) {
		return res.status(400).json({
			message: "An error occurred",
			error: err,
			timestamp: Date.now(),
			path: `/profiles/${address}/list`,
			method: "PUT",
		});
	}
};

exports.getListed = async (req, res) => {
	const address = req.params.address;
	let matchedProfile;
	let listedProducts = [];
	let listedMaterials = [];
	try {
		matchedProfile = await Profile.findOne({ walletAddress: address });
		await Promise.all(
			matchedProfile.listedMaterials.map(async (material) => {
				const matchedMaterial = await Material.findOne({
					materialId: material,
				});
				listedMaterials.push({
					materialId: material,
					name: matchedMaterial.name,
				});
			})
		);

		await Promise.all(
			matchedProfile.listedProducts.map(async (product) => {
				const matchedProduct = await Product.findOne({ productId: product });
				console.log(matchedProduct.name);
				listedProducts.push({
					productId: product,
					name: matchedProduct.name,
				});
			})
		);

		console.log(listedProducts);
		return res.status(200).json({
			message: "Successful",
			products: listedProducts,
			materials: listedMaterials,
			// profile: matchedProfile,
			timestamp: Date.now(),
			path: `/profiles/${address}/list`,
			method: "PUT",
		});
	} catch (err) {
		return res.status(400).json({
			message: "An error occurred",
			error: err,
			timestamp: Date.now(),
			path: `/profiles/${address}/list`,
			method: "PUT",
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
