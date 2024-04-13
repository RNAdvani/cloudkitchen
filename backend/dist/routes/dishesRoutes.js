"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dishesROutes = void 0;
const express_1 = __importDefault(require("express"));
const dishes_controller_1 = require("../controller/dishes.controller");
const multer_1 = require("../middleware/multer");
const app = express_1.default.Router();
exports.dishesROutes = app;
app.post("/add/:restaurant", multer_1.upload, dishes_controller_1.addDish);
app.delete("/delete/:id", multer_1.upload, dishes_controller_1.deleteDish);
app.put("/update/:id", dishes_controller_1.updateDish);
app.get("/all/:restaurant", dishes_controller_1.getAllMyDishes);
