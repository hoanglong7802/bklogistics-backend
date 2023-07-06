const { ethers } = require("ethers");
const Product = require("../models/productModel");
const Material = require("../models/materialModel");
const mongoose = require("mongoose");
const { ProductContractABI } = require("../contract/abis/ProducContractABI");
const { SupplyChainABI } = require("../contract/abis/SupplyChainABI");
const addressController = require("../contract/addresses/address");
const Order = require("../models/orderModel");

exports.updateProductOnChain = async (req, res) => {
	const chainId = Number(req.params.chainId);
	const addresses = addressController.getNetworkAddress(chainId);
	let productCounter;
	let products = [];

	try {
		const provider = new ethers.AlchemyProvider(
			chainId,
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
				productId: Number(response[0]),
				name: response[1],
				chainId: chainId,
			});
		}
		await Product.deleteMany({});
		// await Product.insertMany(...products)
		products.map(async (product) => {
			const newProduct = new Product({
				productId: product.productId,
				name: product.name,
				chainId: chainId,
			});
			await newProduct.save();
		});
		return res.status(200).json({
			message: "Successful",
			path: "/onchain/products",
			timestamp: Date.now(),
			chainId: chainId,
			data: products,
		});
	} catch (err) {
		return res.status(400).json({
			message: "Failed",
			path: "/onchain/products",
			timestamp: Date.now(),
			error: err,
		});
	}
};

exports.updateMaterialOnChain = async (req, res) => {
	const chainId = Number(req.params.chainId);
	const addresses = addressController.getNetworkAddress(chainId);
	let materialCounter;
	let materials = [];

	try {
		const provider = new ethers.AlchemyProvider(
			chainId,
			`${process.env.GOERLI_PRIVATE_KEY}`
		);
		const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

		const productContract = new ethers.Contract(
			addresses.PRODUCT_CONTRACT_ADDRESS,
			ProductContractABI,
			signer
		);

		materialCounter = Number(await productContract.materialCounter());

		for (var i = 1; i <= materialCounter; i++) {
			const response = await productContract.getMaterial(i);
			materials.push({
				id: Number(response[0]),
				name: response[1],
				chainId: chainId,
			});
		}
		await Material.deleteMany({});
		materials.map((material) => {
			const newMaterial = new Material({
				materialId: material.id,
				name: material.name,
				chainId: chainId,
			});
			newMaterial.save();
		});
		return res.status(200).json({
			message: "Successful",
			path: "/onchain/material",
			timestamp: Date.now(),
			chainId: chainId,
			data: materials,
		});
	} catch (err) {
		return res.status(400).json({
			message: "Failed",
			path: "/onchain/material",
			timestamp: Date.now(),
			error: err,
		});
	}
};

exports.updateOrderOnchain = async (req, res) => {
	const chainId = Number(req.params.chainId);
	const addresses = addressController.getNetworkAddress(chainId);
	let materialCounter;
	let orders = [];

	try {
		const provider = new ethers.AlchemyProvider(
			chainId,
			`${process.env.GOERLI_PRIVATE_KEY}`
		);
		const signer = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY, provider);

		const supplyChainContract = new ethers.Contract(
			addresses.SUPPLY_CHAIN_CONTRACT_ADDRESS,
			SupplyChainABI,
			signer
		);

		orderCounter = Number(await supplyChainContract.orderCounter());

		for (var i = 29; i < orderCounter; i++) {
			const response = await supplyChainContract.viewOrder(i);
			if (Number(response[0]) == 0 || Number(response[0]) == 30) continue;
			// orders.push({
			// 	id: Number(response[0]),
			// 	name: response[1],
			// 	chainId: chainId,
			// });
			let order = {
				order_id: Number(response[0]),
				product_id: Number(response[1]),
				created_date: new Date(Number(response[5])),
				status: Number(response[6]),
				is_paid: Number(response[7]),
				deposit_amount: ethers.formatEther(Number(response[8])),
				customer_address: response[2],
				chainId: Number(req.params.chainId),
			};
			// console.log(order);
			orders.push(order);
		}
		console.log(orders);
		await Order.deleteMany({});
		await orders.map(async (order) => {
			const newOrder = new Order(order);
			await newOrder.save();
		});
		return res.status(200).json({
			message: "Successful",
			path: "/onchain/order",
			timestamp: Date.now(),
			chainId: chainId,
			data: orders,
		});
	} catch (err) {
		return res.status(400).json({
			message: "Failed",
			path: "/onchain/order",
			timestamp: Date.now(),
			error: err,
		});
	}
};
