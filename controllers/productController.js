const { ethers } = require("ethers");
const Product = require("../models/productModel");
const mongoose = require("mongoose");
const { ProductContractABI } = require("../contract/abis/ProducContractABI");
const addressController = require("../contract/addresses/address");

// Create a new product
exports.updateProductOnChain = async (req, res) => {
	const addresses = addressController.getNetworkAddress(5);
	let productCounter;
	let products = [];

	try {
		const provider = new ethers.AlchemyProvider(
			5,
			`${process.env.GOERLI_PRIVATE_KEY}`
		);
		const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);
		// const signer =
		const productContract = new ethers.Contract(
			addresses.PRODUCT_CONTRACT_ADDRESS,
			ProductContractABI,
			signer
		);

		productCounter = Number(await productContract.productCounter());

		for (var i = 1; i <= productCounter; i++) {
			const response = await productContract.getProduct(i);
			products.push({
				id: Number(response[0]),
				name: response[1],
			});
		}
		await Product.deleteMany({});
		products.map((product) => {
			const newProduct = new Product({
				id: product.id,
				name: product.name,
			});
			newProduct.save();
		});
		return res.status(200).json({
			message: "Successful",
			path: "/products/update-product-on-chain",
			timestamp: Date.now(),
			data: products,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Failed",
			path: "/products/update-product-on-chain",
			timestamp: Date.now(),
			error: err,
		});
	}
};

exports.createProduct = async (req, res, next) => {
	try {
		const { name, required_material, description } = req.body;

		const product = new Product({
			name,
			required_material,
			description,
		});

		const savedProduct = await product.save();

		res.status(201).json(savedProduct);
	} catch (error) {
		res.send(error);
		next(error);
	}
};

// Get all products
exports.getAllProducts = async (req, res, next) => {
	try {
		const products = await Product.find().exec();

		res.json(products);
	} catch (error) {
		next(error);
	}
};

// Get a specific product
exports.getProductById = async (req, res, next) => {
	try {
		const productId = req.params.id;

		if (!mongoose.Types.ObjectId.isValid(productId)) {
			return res.status(400).json({ error: "Invalid product ID" });
		}

		const product = await Product.findById(productId);

		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.json(product);
	} catch (error) {
		next(error);
	}
};

exports.getProducts = async (req, res, next) => {
	try {
		const { name, required_material, description } = req.query;
		let query = {};

		if (name) {
			query.name = { $regex: name, $options: "i" };
		}

		if (required_material) {
			query.material = { $in: [material] };
		}

		if (description) {
			query.description = { $regex: description, $options: "i" };
		}

		const products = await Product.find(query).exec();

		res.json(products);
	} catch (error) {
		next(error);
	}
};

// Update a product
exports.updateProduct = async (req, res, next) => {
	try {
		const productId = req.params.id;
		const { name, required_material, description } = req.body;

		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			{ name, required_material, description },
			{ new: true }
		);

		if (!updatedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.json(updatedProduct);
	} catch (error) {
		next(error);
	}
};

// Delete a product
exports.deleteProduct = async (req, res, next) => {
	try {
		const productId = req.params.id;

		const deletedProduct = await Product.findByIdAndDelete(productId);

		if (!deletedProduct) {
			return res.status(404).json({ error: "Product not found" });
		}

		res.sendStatus(204);
	} catch (error) {
		next(error);
	}
};
