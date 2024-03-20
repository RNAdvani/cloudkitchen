"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dishesROutes = void 0;
const express_1 = __importDefault(require("express"));
const dishes_controller_1 = require("../controller/dishes.controller");
const authRoles_1 = require("../middleware/authRoles");
const app = express_1.default.Router();
exports.dishesROutes = app;
app.post("/add/:restaurant", (0, authRoles_1.authRoles)("chef"), dishes_controller_1.addDish);
app.put("/update/:id", (0, authRoles_1.authRoles)("chef"), dishes_controller_1.updateDish);
