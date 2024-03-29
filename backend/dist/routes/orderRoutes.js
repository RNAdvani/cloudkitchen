"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("../controller/orders.controller");
const authRoles_1 = require("../middleware/authRoles");
const app = express_1.default.Router();
exports.orderRoutes = app;
app.post("/new", (0, authRoles_1.authRoles)("user"), orders_controller_1.createOrder);
app.get("/my", (0, authRoles_1.authRoles)("user"), orders_controller_1.allOrders);
app.get("/received/:kitchen", (0, authRoles_1.authRoles)("chef"), orders_controller_1.receivedOrders);
app.post("/update/:id", (0, authRoles_1.authRoles)("chef"), orders_controller_1.updateOrderStatus);
