"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kitchenRoutes = void 0;
const express_1 = __importDefault(require("express"));
const kitchen_controller_1 = require("../controller/kitchen.controller");
const app = express_1.default.Router();
exports.kitchenRoutes = app;
app.post("/add", kitchen_controller_1.addKitchen);
app.post("/review/:restaurant", kitchen_controller_1.addReview);
app.post("/toggle/:restaurant", kitchen_controller_1.toggleKitchen);
app.get("/open/:restaurant", kitchen_controller_1.isOpen);
