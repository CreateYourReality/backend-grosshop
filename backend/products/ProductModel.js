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
	weight: Number,
	isDeal: Boolean,
	isMemberDeal: Boolean,
	memberDiscount: Number,
	dealDiscount: Number,
	reducedMemberPrice: {
		type: Number,
		default: function () {
			if (this.price && this.memberDiscount) {
				return this.price - this.price * (this.memberDiscount / 100);
			} else {
				return null;
			}
		},
	},
	reducedDealPrice: {
		type: Number,
		default: function () {
			if (this.price && this.dealDiscount) {
				return this.price - this.price * (this.dealDiscount / 100);
			} else {
				return null;
			}
		},
	},
});

export const Product = mongoose.model("Product", productSchema);

export default Product;
