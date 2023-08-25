import { User } from "./UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import { createResetToken, validateResetToken } from "./ResetTokenModel.js";
import {
	authenticateToken,
	generateAccessToken,
	generateRefreshToken,
} from "./authToken.js";

const hoursInMillisec = (hours) => {
	return 1000 * 60 * 60 * hours;
};

export const getAllUser = async (req, res) => {
	const data = await User.find();
	res.send(data);
};

export const secureUser = async (req, res) => {
	//console.log(req);
	try {
		const newUser = await User.findById(req.user);
		//console.log(newUser);
		const newRefreshToken = generateRefreshToken(newUser);
		newUser.refreshToken = newRefreshToken;
		console.log(newRefreshToken);
		await newUser.save();
		res.send({ user: newUser, refreshToken: newRefreshToken });
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
	}
};

export const refreshUser = async (req, res) => {
	const user = req.user;
	const newAccessToken = generateAccessToken(user);
	res.json({ accessToken: newAccessToken });
};

export const getOneUser = async (req, res) => {
	const id = req.params.id;
	const data = await User.findById(id);
	res.send(data);
};

export const logoutUser = async (req, res) => {
	res.clearCookie("auth");
	res.send("OK");
};

export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email }).select("+hash").select("+salt");
		const passwordIsValid = user.verifyPassword(password);

		if (passwordIsValid) {
			const tokenUser = await User.findOne({ email });
			//console.log("User: " + tokenUser);
			const token = generateAccessToken(tokenUser);
			/* 			const refreshToken = generateRefreshToken(tokenUser); */
			res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4) });
			/* 			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				maxAge: hoursInMillisec(7 * 24),
			}); */

			res.send({ message: "Success", data: user });
		} else {
			res.status(404).send({
				message: "Failed to login",
				error: { message: "Something went wrong." },
			});
		}
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

export const signUpUser = async (req, res) => {
	try {
		const { nickname, firstname, email, password, surname, role, favProducts } =
			req.body;
		let user = new User({
			nickname,
			firstname,
			surname,
			role,
			email,
			favProducts,
		});
		user.setPassword(password);
		try {
			user = await user.save();
			res.status(200).send("User wurde erstellt");
		} catch (e) {
			console.log(e);
			if (e.name === "ValidationError") {
				return res.status(400).send({ error: e });
			}

			if (e.name === "MongoServerError" && e.code === 11000) {
				console.log("Account exists already");
				return res.status(400).send({
					error: {
						message: "Username and Password combination not valid",
					},
				});
			}

			return res
				.status(500)
				.send({ error: { message: "Unknown Server Error" } });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("bababa");
	}
};

export const resetPassword = async (req, res) => {
	const { email } = req.body;
	try {
		console.log("reset password for ", email);
		await createResetToken(email);
		return res.sendStatus(200);
	} catch (e) {
		if (e?.message === "No User is with this email") {
			return res.status(404).send({ error: "User not found" });
		}

		return res.status(500).send("hehe its wrong to use this hehe");
	}
};

export const resetPasswordConfirm = async (req, res) => {
	const { id, token, newpassword, confirmpassword } = req.body;
	console.log(req.body);
	console.log(id);
	try {
		const isValidResetProcess = await validateResetToken(id, token);
		const confirmPasswords = newpassword === confirmpassword;

		console.log(isValidResetProcess);
		if (!isValidResetProcess) {
			throw new Error("NonValidResetProcess");
		}

		const user = await User.findById(id);
		if (confirmPasswords) {
			user.setPassword(confirmpassword);
		} else {
			throw new Error("Password aren't the same");
		}

		await user.save();
		return res.send({
			data: { message: "New password confirmed" },
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({
			error: "Something went wrong",
			message: e.message,
		});
	}
};

export const putUser = async (req, res) => {
	try {
		const id = req.params.id;
		if (req.file) {
			cloudinary.uploader
				.upload_stream(
					{ resource_type: "image", folder: "UserImages" },
					async (err, result) => {
						const response = await User.findByIdAndUpdate(id, {
							...req.body,
							image: { url: result.secure_url, imageId: result.public_id },
						});
						cloudinary.uploader.destroy(response.image?.imageId, (err) => {
							console.log(err);
						});
						res.json(response);
					}
				)
				.end(req.file.buffer);
		} else {
			const updateUser = await User.findByIdAndUpdate(id, req.body);
			res.send(updateUser);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500).send(err);
	}
};

export const deleteUser = async (req, res) => {
	const id = req.params.id;
	try {
		const deleteUser = await User.findByIdAndDelete(id);
		console.log(deleteUser);
		if (deleteUser)
			cloudinary.uploader.destroy(deleteUser.image?.imageId, (error) => {
				console.log(error);
			});
		res.status(200).send(`${deleteUser} wurde gelöscht`);
	} catch (error) {
		console.log(error);
		res.send("Error Image Deletion");
	}
};

//todo ProductCart?

export const updateUserProductCart = async (req, res) => {
	const id = req.params.id;
	const amount = req.body.amount;
	const productId = req.body.id;
	try {
		const countAsNumber = Number(amount);
		const updateUserProduct = await User.findOneAndUpdate(
			{ _id: id, "ProductCart.id": productId },
			{
				$set: { "ProductCart.$.amount": countAsNumber },
			},
			{ new: true }
		);

		if (!updateUserProduct) {
			const updateWithNewProduct = await User.findOneAndUpdate(
				{ _id: id },
				{
					$push: {
						ProductCart: { id: productId, amount: countAsNumber },
					},
				},
				{ new: true }
			);
			res.status(200).send(updateWithNewProduct);
		} else {
			res.status(200).send(updateUserProduct);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deleteOneUserProductCart = async (req, res) => {
	const _id = req.params.id;
	const productId = req.body.id;
	try {
		const updateUserProduct = await User.findByIdAndUpdate(
			{ _id: _id },
			{ $pull: { ProductCart: { id: productId } } }
		);
		res.status(200).send(updateUserProduct);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const updateUserFavProducts = async (req, res) => {
	const id = req.params.id;
	const { amount } = req.body;
	const productId = req.body.id;
	try {
		const countAsNumber = Number(amount);
		const updateUserProduct = await User.findOneAndUpdate(
			{ _id: id, "favProducts.id": productId },
			{
				$set: { "favProducts.$.amount": countAsNumber },
			},
			{ new: true }
		);
		console.log(productId);
		if (!updateUserProduct) {
			const updateWithNewProduct = await User.findOneAndUpdate(
				{ _id: id },
				{
					$push: {
						favProducts: { id: productId, amount: countAsNumber },
					},
				},
				{ new: true }
			);
			res.status(200).send(updateWithNewProduct);
		} else {
			res.status(200).send(updateUserProduct);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deleteUserFavProducts = async (req, res) => {
	const id = req.params.id;
	const productId = req.body.id;

	try {
		const updateUserProduct = await User.findByIdAndUpdate(
			{ _id: id },
			{ $pull: { favProducts: { id: productId } } }
		);
		res.status(200).send(updateUserProduct);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};
