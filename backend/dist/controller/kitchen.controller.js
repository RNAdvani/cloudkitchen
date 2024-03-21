"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.addKitchen = void 0;
const error_1 = require("../middleware/error");
const CloudKitcehn_1 = require("../models/CloudKitcehn");
const User_1 = require("../models/User");
const utility_class_1 = require("../utils/utility-class");
const mongoose_1 = __importDefault(require("mongoose"));
exports.addKitchen = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { user } = req.query;
    if (!user)
        return next(new error_1.ErrorHandler(400, "Unauth"));
    const { name } = req.body;
    const kitchenPromise = CloudKitcehn_1.Kitchen.create({ owner: user, name });
    const findUserPromise = User_1.User.findById(user);
    const [kitchen, findUser] = await Promise.all([kitchenPromise, findUserPromise]);
    if (findUser) {
        findUser.owner = kitchen._id;
        findUser.role = "chef";
        await findUser.save();
    }
    ;
    res.status(201).json({
        success: true,
        kitchen
    });
});
exports.addReview = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { restaurant } = req.params;
    const { user } = req.query;
    const { rating, review } = req.body;
    const findUserPromise = User_1.User.findById(user);
    const kitchenPromise = CloudKitcehn_1.Kitchen.findById(restaurant).select("reviews");
    const [findUser, kitchen] = await Promise.all([findUserPromise, kitchenPromise]);
    if (!findUser)
        return next(new error_1.ErrorHandler(400, "Bad"));
    if (!kitchen)
        return next(new error_1.ErrorHandler(404, "Not found"));
    kitchen.reviews.push({ user: findUser._id, rating, review });
    await kitchen.save();
    const [piplelinePromise] = await CloudKitcehn_1.Kitchen.aggregate([
        {
            $unwind: "$reviews"
        },
        {
            $group: {
                _id: "$_id",
                ratingCount: {
                    $avg: "$reviews.rating"
                }
            }
        },
        {
            $match: { "_id": new mongoose_1.default.Types.ObjectId(restaurant) }
        },
        {
            $set: {
                "ratings": "$ratingCount"
            }
        }
    ]);
    kitchen.ratings = Number(piplelinePromise.ratings.toFixed(1));
    await kitchen.save();
    res.status(200).json({
        success: true,
        message: "Review Added",
    });
});
