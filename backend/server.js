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
/* import { Product } from "./products/ProductModel.js";
 */
dotenv.config({
	path: path.join(path.resolve(), "..", ".env"),
});

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT;
const app = express();
<<<<<<< HEAD
//Cloudinary data
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});
=======
>>>>>>> 74bd28171d2c5fbeef01afb218747e3bb1758a65

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors()); // ###################### ENTFERNEN?!

app.get("/api/status", (req, res) => {
	res.send({ status: "Ok" });
});

/* app.get("/api/products", async (req, res) => {
	const data = await Product.find();
	res.json(data);
});
 */
app.use("/api/users", UserRouting);

app.use("/api/products", ProductRouting);

app.listen(PORT, async () => {
	await setup(); //todo for logs file system
	console.log("Server running on Port: ", PORT);
});
