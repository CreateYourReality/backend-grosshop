import { Router } from "express";
import multer from "multer";
import Order from "./OrderModel.js";
import {
	getAllOrders,
	getOneOrder,
	postOrder,
	putOrder,
	deleteOrder,
} from "./controller.js";
export let router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllOrders);
router.get("/:id", getOneOrder);
//router.get("/quarry", getAllOrders); // quarry

router.post("/", upload.single("image"), postOrder);
router.put("/:id", upload.single("image"), putOrder);
router.delete("/:id", deleteOrder);
