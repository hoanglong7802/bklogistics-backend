const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/userModel");
const { generateAccessToken, generateRefreshToken } = require("../utils/index");
const jwt = require("jsonwebtoken");

module.exports = {
	register: async (req, res) => {
		try {
			const existedwalletAddress = await User.findOne({
				walletAddress: req.body.walletAddress,
			});
			if (existedwalletAddress)
				throw { status: 409, message: "address already exists" };

			bcrypt.genSalt(saltRounds, function (err, salt) {
				bcrypt.hash(req.body.password, salt, async (err, hash) => {
					if (err) throw { status: 500, message: err.message };
					const newUser = new User({
						walletAddress: req.body.walletAddress,
						passwordHash: hash,
					});

					if (!newUser)
						throw { status: 400, message: "Error occured while registering" };

					await newUser.save();
					return res.status(200).json({
						status: "Successfully",
						walletAddress: newUser.walletAddress,
					});
				});
			});
		} catch (err) {
			return res
				.status(err.status || 500)
				.json({ status: "Failed", message: err.message });
		}
	},
	login: async (req, res) => {
		// try {
		const inputPassword = req.body.password;
		const matchedUser = await User.findOne({
			walletAddress: req.body.walletAddress,
		});
		if (!matchedUser) throw { status: 401, message: "Address not exists" };
		const matchedPassword = await bcrypt.compareSync(
			inputPassword,
			matchedUser.passwordHash
		);
		if (!matchedPassword) {
			throw { status: 401, message: "Wrong password" };
		}
		const accessToken = generateAccessToken({
			walletAddress: matchedUser.walletAddress,
			role: matchedUser.role,
		});
		const refreshToken = generateRefreshToken({
			walletAddress: matchedUser.walletAddress,
			role: matchedUser.role,
		});
		return res.status(200).json({
			status: "Successfully",
			jwt: accessToken,
			refreshToken: refreshToken,
		});
		// } catch (err) {
		// 	return res
		// 		.status(err.status || 500)
		// 		.json({ status: "Failed", message: err.message });
		// }
	},
	refresh: async (req, res) => {
		const refreshToken = req.body.refreshToken;
		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
			if (err) return res.status(403).json({ message: err.message });
			return res.json({
				jwt: generateAccessToken({ walletAddress: user.walletAddress }),
			});
		});
	},
	changePassword: async (req, res) => {
		try {
			const matchedUser = await User.findOne({ _id: req.user?.id });
			bcrypt.genSalt(saltRounds, function (err, salt) {
				bcrypt.hash(req.body.password, salt, async (err, hash) => {
					if (err) throw { status: 500, message: err.message };
					matchedUser.passwordHash = hash;
					await matchedUser.save();
					return res.status(200).json({
						status: "Successfully",
						walletAddress: matchedUser.walletAddress,
					});
				});
			});
		} catch (err) {
			return res
				.status(err.status || 500)
				.json({ status: "Failed", message: err.message });
		}
	},
	getUser: async (req, res) => {
		jwt.verify(
			req.headers.authorization,
			process.env.ACCESS_TOKEN_SECRET,
			async (err, user) => {
				if (err) return res.status(403).json({ status: "JWT not accepted" });
				const matchedUser = await User.findOne({
					walletAddress: user.walletAddress,
				});
				if (!matchedUser)
					return res.status(403).json({ status: "JWT not accepted" });
				res.status(200).json({
					status: "Accepted",
					user: {
						walletAddress: matchedUser.walletAddress,
						firstName: matchedUser.firstName,
						lastName: matchedUser.lastName,
					},
				});
			}
		);
	},
};
