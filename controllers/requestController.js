const { restart } = require("nodemon");
const { SBTContractABI } = require("../contract/abis/SBTContractABI");
const { IPFS_URL } = require("../contract/addresses/address");
const Request = require("../models/requestModel");

module.exports = {
	get: async (req, res) => {
		try {
			const requests = await Request.find({});
			res.status(200).json({
				message: "Successful",
				requests: requests,
				timestamp: Date.now(),
				path: "/request",
				method: "GET",
			});
		} catch (err) {
			res.status(400).json({
				message: "Failed",
				error: err,
				timestamp: Date.now(),
				path: "/request",
				method: "GET",
			});
		}
	},
	getPending: async (req, res) => {
		try {
			const requests = await Request.find({ status: "pending" });
			res.status(200).json({
				message: "Successful",
				requests: requests,
				timestamp: Date.now(),
				path: "/request",
				method: "GET",
			});
		} catch (err) {
			res.status(400).json({
				message: "Failed",
				error: err,
				timestamp: Date.now(),
				path: "/request",
				method: "GET",
			});
		}
	},
	post: async (req, res) => {
		const {
			walletAddress,
			companyName,
			email,
			shippingAddress,
			deliveryAddress,
			phoneNumber,
			haveSBT,
			profileImage,
			chainId,
			description,
		} = req.body;
		try {
			const request = new Request({
				walletAddress: walletAddress,
				companyName: companyName,
				email: email,
				phoneNumber: phoneNumber,
				deliveryAddress: deliveryAddress,
				shippingAddress: shippingAddress,
				profileImage: profileImage,
				phoneNumber: phoneNumber,
				haveSBT: haveSBT,
				chainId: chainId,
				description: description,
				registerDate: Date.now(),
			});

			await request.save();

			res.status(200).json({
				message: "Successful",
				newRequest: request,
				timestamp: request.registerDate,
				path: "/request",
				method: "POST",
			});
		} catch (error) {
			res.status(400).json({
				message: "Failed",
				error: error,
				timestamp: Date.now(),
				path: "/request",
				method: "POST",
			});
		}
	},
	updateStatus: async (req, res) => {
		const id = req.params.id;
		const newStatus = req.body.status;
		try {
			const matchedRequest = await Request.updateOne(
				{ _id: id },
				{ status: newStatus }
			);

			res.status(200).json({
				message: "Successful",
				id: id,
				newStatus: newStatus,
				timestamp: Date.now(),
				path: `/request/update/${id}`,
				method: "PUT",
			});
		} catch (error) {
			res.status(400).json({
				message: "Failed",
				error: error,
				timestamp: Date.now(),
				path: `/request/update/${id}`,
				method: "PUT",
			});
		}
	},
	sbtVerify: async (req, res) => {
		const { chainId, address, issuedBy } = req.body;
		if (issuedBy == "BKLogistics") {
			const chainId = Number(req.params.chainId);
			const addresses = addressController.getNetworkAddress(chainId);
			let productCounter;
			let products = [];

			try {
				const provider = new ethers.AlchemyProvider(
					chainId,
					`${process.env.GOERLI_PRIVATE_KEY}`
				);
				const signer = new ethers.Wallet(
					process.env.WALLET_PRIVATE_KEY,
					provider
				);
				// const signer =
				const SBTContract = new ethers.Contract(
					addresses.SBT_CONTRACT_ADDRESS,
					SBTContractABI,
					signer
				);

				await SBTContract.getSoulBoundFrom(address)
					.then((res) => {
						console.log(res);
						if (res == 0) {
							return res.status(500).json({
								message: "Failed",
								path: "/onchain/products",
								timestamp: Date.now(),
								verified: false,
								error: `${address} not own any Soulbound`,
							});
						} else {
							SBTContract.tokenURI(res)
								.then(async (res) => {
									fetch(`${IPFS_URL}${res}`)
										.then((response) => {
											// const profile = new Profile({
											// 	walletAddress: walletAddress,
											// 	companyName: res.companyName,
											// 	email: email,
											// 	phoneNumber: phoneNumber,
											// 	deliveryAddress: deliveryAddress,
											// 	shippingAddress: shippingAddress,
											// 	phoneNumber: phoneNumber,
											// 	description: description,
											// 	listedMaterials: [],
											// 	listedProducts: [],
											// 	registerDate: Date.now(),
											// });
											console.log(response);
											// await profile.save();
											return res.status(200).json({
												message: "Successful",
												path: "/onchain/products",
												timestamp: Date.now(),
												chainId: chainId,
												verified: true,
												response: response,
												address: address,
											});
										})
										.catch((err) => {
											return res.status(500).json({
												message: "Failed",
												path: "/onchain/products",
												timestamp: Date.now(),
												verified: false,
												error: err,
											});
										});
								})
								.catch((err) => {});
						}
					})
					.catch((err) => console.log(err));

				return res.status(200).json({
					message: "Successful",
					path: "/onchain/products",
					timestamp: Date.now(),
					chainId: chainId,
					verified: true,
					address: address,
				});
			} catch (err) {
				return res.status(500).json({
					message: "Failed",
					path: "/onchain/products",
					timestamp: Date.now(),
					verified: false,
					error: err,
				});
			}
		}
	},
};
