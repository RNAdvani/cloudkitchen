"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.receivedOrders = exports.allOrders = exports.viewOrder = exports.createOrder = void 0;
const error_1 = require("../middleware/error");
const Order_1 = require("../models/Order");
const utility_class_1 = require("../utils/utility-class");
exports.createOrder = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { items, total, subTotal, discount, deliveryCharges } = req.body;
    const { user, restaurant } = req.query;
    if (!user)
        return next(new error_1.ErrorHandler(400, "Kindly Login to place Order"));
    const order = await Order_1.Order.create({ items, total, subTotal, discount, deliveryCharges, restaurant, user });
    res.status(201).json({
        success: true,
        message: "Order Placed successfully"
    });
});
exports.viewOrder = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order_1.Order.findById(id);
    if (!order)
        return next(new error_1.ErrorHandler(404, "Order Not Found"));
    res.status(200).json({
        success: true,
        order
    });
});
exports.allOrders = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { user } = req.query;
    if (!user)
        return next(new error_1.ErrorHandler(404, "Kindly Login to view Your Orders"));
    const orders = await Order_1.Order.find({ user });
    res.status(200).json({
        success: true,
        orders
    });
});
exports.receivedOrders = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { kitchen } = req.params;
    if (!kitchen)
        return next(new error_1.ErrorHandler(404, "Not Found"));
    const orders = await Order_1.Order.find({ restaurant: kitchen });
    res.status(200).json({
        success: true,
        orders
    });
});
exports.updateOrderStatus = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    if (!id)
        return next(new error_1.ErrorHandler(400, "Bad Request"));
    const order = await Order_1.Order.findById(id);
});
