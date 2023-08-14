import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";

export const userRouter = Router();
const multerMiddleware = multer();
