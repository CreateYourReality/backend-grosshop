import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema({
	invoice: {
		type: Number,
		required: [true, "we need a invoice amount"],
		immutable: true,
	},
	transportStatus: {
		type: String,
		required: true,
		enum: ["pending", "processing", "canceled", "picked", "shipped"],
		default: "pending",
	},
	payedStatus: {
		type: String,
		enum: ["pending", "paid", "refunded"],
		default: "pending",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	products: [
		{
			productId: { type: mongoose.Types.ObjectId, ref: "Product" },
			count: { type: Number, default: 1 },
		},
	],
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: true,
		immutable: true,
	},
});

export const Order = mongoose.model("Order", orderSchema);

export default Order;
