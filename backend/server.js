import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors"

import { Product } from "./products/ProductModel.js"


dotenv.config({
    path: path.join(path.resolve(), "..", ".env"),
  });

await mongoose.connect(process.env.DB);
await mongoose.connection.syncIndexes();

const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors()) // ###################### ENTFERNEN?!

app.get("/api/status", (req, res) => {
    res.send({ status: "Ok" });
  });
  
app.get("/api/products", async (req, res) => {
  const data = await Product.find()
  res.json(data)
});

  app.listen(PORT, () => {
    console.log("Server running on Port: ", PORT);
  });