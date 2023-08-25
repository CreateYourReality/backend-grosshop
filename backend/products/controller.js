import { Product } from "./ProductModel.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllProducts = async (req, res) => {
	const data = await Product.find();
	res.send(data);
};

export const getOneProduct = async (req, res) => {
	const id = req.params.id;
	const data = await Product.findById(id);
	res.send(data);
};

export const postProduct = async (req, res) => {
	try {
		cloudinary.uploader
			.upload_stream(
				{ resource_type: "image", folder: "ProductImages" },
				async (err, result) => {
					const response = await Product.create({
						...req.body,
						image: { url: result.secure_url, imageId: result.public_id },
					});
					res.json(response);
				}
			)
			.end(req.file.buffer);
	} catch (error) {
		console.log(error);
		res.status(500).send("bababa");
	}
};

export const getQuarryProducts = async (req, res) => {
	res.status(501).send("Not implemented yet");
};

export const putProduct = async (req, res) => {
	try {
		const id = req.params.id;
		if (req.file) {
			cloudinary.uploader
				.upload_stream(
					{ resource_type: "image", folder: "ProductImages" },
					async (err, result) => {
						const response = await Product.findByIdAndUpdate(id, {
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
			const updateInventar = await Product.findByIdAndUpdate(id, req.body);
			res.send(updateInventar);
		}
	} catch (err) {
		console.error(err);
		res.sendStatus(500).send(err);
	}
};
export const deleteProduct = async (req, res) => {
	const id = req.params.id;
	try {
		const deleteProduct = await Product.findByIdAndDelete(id);
		console.log(deleteProduct);

		cloudinary.uploader.destroy(deleteProduct.image?.imageId, (error) => {
			console.log(error);
		});
		res.status(200).send(`${deleteProduct} wurde gelöscht`);
	} catch (error) {
		console.log(error);
		res.send("Error Image Deletion");
	}
};
