"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("../controller/orders.controller");
const app = express_1.default.Router();
exports.orderRoutes = app;
app.post("/new", orders_controller_1.createOrder);
app.get("/my", orders_controller_1.allOrders);
app.get("/received/:kitchen", orders_controller_1.receivedOrders);
app.post("/update/:id", orders_controller_1.updateOrderStatus);
app.get("/current/:restaurant", orders_controller_1.currentOrders);
