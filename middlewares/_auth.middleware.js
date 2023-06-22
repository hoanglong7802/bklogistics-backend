const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = {
	authenticate: async (req, res, next) => {
		jwt.verify(
			req.headers.authorization,
			process.env.ACCESS_TOKEN_SECRET,
			async (err, user) => {
				if (err) return res.status(403).json({ status: "Forbidden" });
				const matchedUser = await User.findOne({
					walletAddress: user.walletAddress,
				});
				req.user = {
					walletAddress: user.walletAddress,
					id: matchedUser._id,
				};
				next();
			}
		);
	},
};
