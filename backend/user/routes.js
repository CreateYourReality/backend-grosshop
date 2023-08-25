import { Router } from "express";
import multer from "multer";
import { authenticateToken, authenticateRefreshToken } from "./authToken.js";
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
	refreshUser,
	updateUserProductCart,
	deleteOneUserProductCart,
	updateUserFavProducts,
	deleteUserFavProducts,
} from "./controller.js";

export const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllUser); // get all Users
router.get("/secure", authenticateToken, secureUser);
router.get("/refresh", authenticateRefreshToken, refreshUser);
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

/* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU1OGMwYWFiNjI0NmMxNmNlZTU5MjMiLCJpYXQiOjE2OTI5NjgwNzQsImV4cCI6MTY5MzU3Mjg3NH0.yvH4PKn7bD3pPKzT7Qv_K7s8_4_HzZtAzfbDiNK6niA */
