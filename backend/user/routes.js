import { Router } from "express";
import multer from "multer";
import User from "./UserModel.js";
import { authenticateToken } from "./authToken.js";

import {
	getAllUser,
	getOneUser,
	logoutUser,
	loginUser,
	signUpUser,
	resetPassword,
	putUser,
	deleteUser,
	updateUserProductCart,
	deleteOneUserProductCart,
	updateUserFavProducts,
	deleteUserFavProducts,
	secureUser,
} from "./controller.js";

export const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllUser); // get all Users
router.get("/:id", getOneUser); //get User per id
router.get("/logout", logoutUser); // logs the User out

router.post("/login", upload.none(), loginUser); // logs user in
router.post("/signup", upload.none(), signUpUser); // register user
router.post("/resetPassword", resetPassword); //password reset

router.put("/:id", upload.single("image"), putUser); //update userprofile by id
router.delete("/:id", deleteUser); // delete User

//todo ProductCart?
router.put("/updateUserProductCart/:id", upload.none(), updateUserProductCart);
router.delete(
	"/updateUserProductCart/:id",
	upload.none(),
	deleteOneUserProductCart
);
router.get("/secure", authenticateToken, secureUser);

router.put("/updateUserFavProducts/:id", upload.none(), updateUserFavProducts);
router.delete(
	"/updateUserFavProducts/:id",
	upload.none(),
	deleteUserFavProducts
);
