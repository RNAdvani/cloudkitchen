import express from "express";
import { upload } from "../middleware/multer";
import { getUser, registerUser } from "../controller/user.controller";

const router = express.Router();

router.route("/register").post(upload,registerUser);
router.route("/:id").get(getUser);

export {router as userRoutes}