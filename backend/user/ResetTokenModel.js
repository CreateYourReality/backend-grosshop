import crypto from "crypto";
import mongoose from "mongoose";
import User from "./UserModel.js";
import { passwordResetMailTemplate } from "../lib/mailTemplate.js";
import { sendMail } from "../lib/sendMail.js";

const resetTokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
		expires: 7200,
	},
});

export const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

export const createResetToken = async (userEmail) => {
	console.log("resettoken generieren");
	const user = await User.findOne({ email: userEmail });
	if (!user) {
		throw new Error("No User with this email");
	}

	let token = await ResetToken.findOne({ userId: user._id });
	if (token) await token.deleteOne();

	const resetToken = crypto.randomBytes(64).toString("hex");
	ResetToken.create({
		userId: user._id,
		token: resetToken,
		createdAt: Date.now(), //optional
	});

	const clientURL = process.env.RENDER_EXTERNAL_URL;
	const resetURL = new URL(
		`/resetpassword?token=${resetToken}&id=${user.id}`,
		clientURL
	);

	const mailHTML = passwordResetMailTemplate({
		name: user.name,
		resetLink: resetURL,
	});
	try {
		await sendMail({
			to: [user.email],
			subject: `${process.env.APP_NAME} passwordreset`,
			html: mailHTML,
		});
	} catch (e) {
		console.log("Fehler beim senden der mail");
	}
};

export const validateResetToken = async (userId, resetToken) => {
	try {
		const passwordResetToken = await ResetToken.findOne({ userId }).populate(
			"userId"
		);
		if (!passwordResetToken) {
			throw new Error("Token expired");
		}
		const isValid = resetToken === passwordResetToken.token;
		return isValid;
	} catch (e) {
		if (!(e.message === "Token expired")) throw new Error("Can't find User");
	}
};
export default ResetToken;
