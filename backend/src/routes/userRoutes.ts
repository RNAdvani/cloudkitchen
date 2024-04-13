import express from "express";
import { upload } from "../middleware/multer";
import { getUser, registerUser, updateProfile } from "../controller/user.controller";

const router = express.Router();

router.route("/register").post(upload,registerUser);
router.route("/:id").get(getUser);
router.route("/update/:id").get(upload,updateProfile);

export {router as userRoutes}