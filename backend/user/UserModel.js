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
	nickname: { type: String },
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
	ProductCart: [
		{
			productId: { type: mongoose.Types.ObjectId, ref: "Product" },
			count: { type: Number, default: 1 },
		},
	],
	favProducts: [{ type: mongoose.Types.ObjectId, ref: "Product" }],
	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user",
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

//todo validierung?!?!?
// userSchema.index({ favProducts: 1 }, { unique: true });
userSchema.path("favProducts").validate(function (value) {
	const objectIdSet = new Set();
	console.log("hi");
	for (const objectId of value) {
		if (objectIdSet.has(objectId.toString())) {
			return false;
		}
		objectIdSet.add(objectId.toString());
	}
	return true;
}, "Duplicate ObjectId values found in the favProducts array.");

export const User = mongoose.model("User", userSchema);

export default User;
