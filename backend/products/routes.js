import { Router } from "express";
import multer from "multer";
import Product from "./ProductModel.js";
import {
	getAllProducts,
	getOneProduct,
	postProduct,
	putProduct,
	deleteProduct,
	getQuarryProducts,
} from "./controller.js";
export let router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.get("/quarry*", getQuarryProducts); // quarry

router.post("/", upload.single("image"), postProduct);
router.put("/:id", upload.single("image"), putProduct);
router.delete("/:id", deleteProduct);
