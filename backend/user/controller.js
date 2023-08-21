import { User } from "./UserModel.js";
import { v2 as cloudinary } from "cloudinary";
import { createResetToken } from "./ResetTokenModel.js";
import { authenticateToken, generateAccessToken } from "./authToken.js";

const hoursInMillisec = (hours) => {
	return 1000 * 60 * 60 * hours;
};

export const getAllUser = async (req, res) => {
	const data = await User.find();
	res.send(data);
};

export const secureUser = async (req, res) => {
	console.log(req.user);
	res.send(req.user);
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
	const user = await User.findOne({ email }).select("+hash").select("+salt");

	const passwordIsValid = user.verifyPassword(password);

	if (passwordIsValid) {
		const tokenUser = await User.findOne({ email });
		const token = generateAccessToken({ tokenUser });
		res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMillisec(4) });

		res.send({ message: "Success", data: user });
	} else {
		res.status(404).send({
			message: "Failed to login",
			error: { message: "Something went wrong." },
		});
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
		await createResetToken(email);
		return res.sendStatus(200);
	} catch (e) {
		console.log(e);

		if (e?.message === "No User is with this email") {
			return res.status(404).send({ error: "User not found" });
		}

		return res.sendStatus(500).send("hehe its wrong to use this hehe");
	}
};

export const resetPasswordConfirm = async (req, res) => {
	const { id, token, password } = req.body;
	const isValidResetProcess = validateResetToken(id, token);
	try {
		if (!isValidResetProcess) {
			throw new Error("NonValidResetProcess");
		}

		const user = await User.findById(id);
		user.setPassword(password);

		await user.save();
		return res.send({
			data: { message: "New password confirmed" },
		});
	} catch (e) {
		console.log(e);
		res.status(500).send({ error: "Something went wrong" });
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
	const { productId, amount } = req.body;
	try {
		const countAsNumber = Number(amount);
		const updateUserProduct = await User.findOneAndUpdate(
			{ _id: id },
			{
				$push: { ProductCart: { id: productId, amount: countAsNumber } },
			},
			{ new: true }
		);
		res.status(200).send(updateUserProduct);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deleteOneUserProductCart = async (req, res) => {
	const id = req.params.id;
	const { productId } = req.body;
	try {
		const updateUserProduct = await User.findByIdAndUpdate(
			{ _id: id },
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
	const  { amount } = req.body;
	const productId = req.body.id;
	try {
		const countAsNumber = Number(amount);
		const updateUserProduct = await User.findOneAndUpdate(
			{ _id: id },
			{
				$push: { favProducts: { id: productId, amount: countAsNumber } },
			},
			{ new: true }
		);
		res.status(200).send(updateUserProduct);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
};

export const deleteUserFavProducts = async (req, res) => {
	const id = req.params.id;
	const  productId  = req.body.id;

	console.log({body:req.body});

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
