import { Router } from "express";
import multer from "multer";
import { authenticateToken } from "./authToken.js";
import {
	getAllUser,
	getOneUser,
	logoutUser,
	secureUser,
	loginUser,
	signUpUser,
	resetPassword,
	resetPasswordConfirm,
	putUser,
	deleteUser,
	updateUserProductCart,
	deleteOneUserProductCart,
	updateUserFavProducts,
	deleteUserFavProducts,
} from "./controller.js";

export const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllUser);
router.get("/secure", authenticateToken, secureUser); // get all Users
router.get("/logout", logoutUser); // logs the User out
router.get("/:id", getOneUser); //get User per id

router.post("/login", upload.none(), loginUser); // logs user in
router.post("/signup", upload.none(), signUpUser); // register user
router.post("/resetPassword", upload.none(), resetPassword); //password reset
router.post("/resetPasswordConfirm", upload.none(), resetPasswordConfirm); //password reset

router.put("/:id", upload.single("image"), putUser); //update userprofile by id
router.delete("/:id", deleteUser); // delete User

//todo ProductCart?
router.put("/updateUserProductCart/:id", upload.none(), updateUserProductCart);
router.put(
	"/deleteUserProductCart/:id",
	upload.none(),
	deleteOneUserProductCart
);

router.put("/updateUserFavProducts/:id", upload.none(), updateUserFavProducts);
router.put("/deleteUserFavProducts/:id", upload.none(), deleteUserFavProducts);
