import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import {
	getAllUser,
	getOneUser,
	logoutUser,
	loginUser,
	signUpUser,
	resetPassword,
	putUser,
	deleteUser,
	updateUserProductCard,
	deleteOneUserProductCard,
} from "./controller.js";
export const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllUser); // get all Users
router.get("/:id", getOneUser); //get User per id
router.get("/logout", logoutUser); // logs the User out

router.post("/login", loginUser); // logs user in
router.post("/signup", upload.none(), signUpUser); // register user
router.post("/resetPassword", resetPassword); //password reset

router.put("/:id", upload.single("image"), putUser); //update userprofile by id
router.delete("/:id", deleteUser); // delete User

//todo productCard?
router.put("/updateProductCard/:id", upload.none(), updateUserProductCard);
router.delete(
	"/updateProductCard/:id",
	upload.none(),
	deleteOneUserProductCard
);
