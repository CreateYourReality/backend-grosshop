import jwt from "jsonwebtoken";

// userEmailObj = {email: ""}
export function generateAccessToken(user, persist = false) {
	//console.log(user);
	return jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
		expiresIn: persist ? "7d" : "4h",
	});
}

export function generateRefreshToken(user) {
	//console.log("User " + user);
	return jwt.sign({ _id: user._id }, process.env.RESET_SECRET, {
		expiresIn: "7d",
	});
}

export function authenticateToken(req, res, next) {
	let token = null;
	if (req?.cookies?.auth) {
		token = req.cookies.auth;
	}

	if (!token) {
		const authHeader = req.headers["authorization"];
		token = authHeader && authHeader.split(" ")[1];
	}

	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatsus(403);
		console.log(user);
		req.user = user._id;

		next();
	});
}

export function authenticateRefreshToken(req, res, next) {
	const refreshToken = req.cookies.refreshToken;

	if (!refreshToken) {
		return res.sendStatus(401);
	}

	jwt.verify(refreshToken, process.env.RESET_SECRET, (err, user) => {
		if (err) {
			return res.sendStatus(403);
		}
		req.user = user._id;
		next();
	});
}
