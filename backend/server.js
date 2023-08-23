import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import { setup } from "./setup.js";
import { router as UserRouting } from "./user/routes.js";
import { router as ProductRouting } from "./products/routes.js";
import { router as OrderRouting } from "./orders/routes.js";
/* import { Product } from "./products/ProductModel.js";
 */
const FE_DIR = new URL("../frontend/dist", import.meta.url).pathname;
const FE_INDEX = new URL("../frontend/dist/index.html", import.meta.url)
	.pathname;

dotenv.config({
	path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT;
const app = express();
//Cloudinary data
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors()); // ###################### ENTFERNEN?!
app.use(express.static(FE_DIR));

app.get("/api/status", (req, res) => {
	res.send({ status: "Ok" });
});

/* app.get("/api/products", async (req, res) => {
	const data = await Product.find();
	res.json(data);
});
 */
app.use("/api/users", UserRouting);
app.use("/api/orders", OrderRouting);

app.use("/api/products", ProductRouting);

app.get("*", (req, res) => res.sendFile(FE_INDEX));
app.listen(PORT, async () => {
	await setup(); //todo for logs file system
	console.log("Server running on Port: ", PORT);
});
