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
				error: error,
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
};
