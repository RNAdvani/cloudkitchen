"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middleware/multer");
const user_controller_1 = require("../controller/user.controller");
const router = express_1.default.Router();
exports.userRoutes = router;
router.route("/register").post(multer_1.upload, user_controller_1.registerUser);
router.route("/:id").get(user_controller_1.getUser);
router.route("/update/:id").get(multer_1.upload, user_controller_1.updateProfile);
