import { Order } from "./OrderModel.js";

export const getAllOrders = async (req, res) => {
	const data = await Order.find();
	res.send(data);
};

export const getOneOrder = async (req, res) => {
	const id = req.params.id;
	const data = await Order.findById(id);
	res.send(data);
};

export const postOrder = async (req, res) => {
	try {
		const response = await Order.create({
			...req.body,
		});
		res.json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export const putOrder = async (req, res) => {
	try {
		const id = req.params.id;
		const updateInventar = await Order.findByIdAndUpdate(id, req.body);
		res.status(200).send(updateInventar);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
};
export const deleteOrder = async (req, res) => {
	const id = req.params.id;
	try {
		const deleteOrder = await Order.findByIdAndDelete(id);
		console.log(deleteOrder);
		res.status(200).send(`${deleteOrder} wurde gelöscht`);
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
};

export const getOrderByUserId = async (req, res) => {
	const { id } = req.params;
	try {
		const orders = await Order.find({ user: { $in: id } });
		console.log(orders);
		res.status(200).send(orders);
	} catch (e) {
		res.status(500).send(e);
	}
};
