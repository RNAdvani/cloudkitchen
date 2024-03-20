"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kitchenRoutes = void 0;
const express_1 = __importDefault(require("express"));
const kitchen_controller_1 = require("../controller/kitchen.controller");
const authRoles_1 = require("../middleware/authRoles");
const app = express_1.default.Router();
exports.kitchenRoutes = app;
app.post("/add", (0, authRoles_1.authRoles)("admin"), kitchen_controller_1.addKitchen);
