import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
	productName: {
		type: String,
		minlength: 1,
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
	},
	discoundFlag: Boolean,
	discount: Number,
	reducedPrice: {
		type: Number,
		default: function () {
			if (this.price && this.discount) {
				return this.price - this.price * (this.discount / 100);
			} else {
				return null;
			}
		},
	},
});

export const Product = mongoose.model("Product", productSchema);

export default Product;
