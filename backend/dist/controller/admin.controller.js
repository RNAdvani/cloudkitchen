"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Dishes_1 = require("../models/Dishes");
const Order_1 = require("../models/Order");
const utility_class_1 = require("../utils/utility-class");
exports.getDashboardStats = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { restaurant } = req.params;
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const cusineCountPromise = Dishes_1.Dish.aggregate([{
            $match: {
                restaurant: new mongoose_1.default.Types.ObjectId('65fb115b9ea231becc2b8e7f')
            }
        },
        {
            $group: {
                _id: "$cuisine",
                count: { $sum: 1 }
            }
        }]);
    const [orders, cuisineCount] = await Promise.all([Order_1.Order.find({ restaurant, createdAt: { $gte: sevenDaysAgo, $lte: today } }).select("createdAt"), cusineCountPromise]);
    const numberOfOrders = new Array(7).fill(0);
    orders.forEach((i) => {
        const index = Math.ceil(today.getDay() - i.createdAt.getDay() + 7) % 7;
        numberOfOrders[index]++;
    });
    const dashboard = {
        numberOfOrders: numberOfOrders.reverse(),
        cuisineCount
    };
    res.status(200).json({
        success: true,
        dashboard
    });
});
