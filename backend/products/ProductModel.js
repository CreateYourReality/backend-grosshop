import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		minlength: 1,
		maxlength: 50,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: {
			url: String,
			imageId: String,
		},
		required: true,
	},
	price: {
		type: Number,
		required: true,
		immutable: true,
	},
	rating: {
		type: Number,
		required: true,
		immutable: true,
	},
});

export const Product = mongoose.model("Product", productSchema);

export default Product;
