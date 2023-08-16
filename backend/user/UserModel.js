import mongoose from "mongoose";
import crypto from "crypto";
import productsSchema from "../products/ProductModel.js";

const isEmail = (string) => {
	const [name, domainWithTLD, ...rest] = string.split("@");

	if (rest.length || !name || !domainWithTLD) {
		return false;
	}

	const [domain, tld] = domainWithTLD.split(".");
	if (tld.length < 2 || !domain) {
		return false;
	}
	return true;
};

const userSchema = new mongoose.Schema({
	nickname: { type: String, required: [true, "Please specify your Nickame"] },
	image: {
		type: {
			url: String,
			imageId: String,
		},
	},
	firstname: String,
	surname: String,
	email: {
		type: String,
		unique: true,
		lowercase: true,
		index: true,
		required: true,
		validate: {
			validator: isEmail,
			message: (props) => `${props.value} is not a valid email`,
		},
	},
	salt: { type: String, required: true, select: false },
	hash: { type: String, required: true, select: false },
	productCard: [{ type: mongoose.Types.ObjectId, ref: "products" }],
	favProducts: [{ type: mongoose.Types.ObjectId, ref: "products" }],
	role: {
		type: String,
		enum: ["admin", "user"],
	},
});

userSchema.methods.setPassword = function (password) {
	this.salt = crypto.randomBytes(64).toString("hex");

	this.hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
		.toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
	const hash = crypto
		.pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
		.toString("hex");

	return this.hash === hash;
};

export const User = mongoose.model("User", userSchema);

export default User;
