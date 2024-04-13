"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateKitchen = exports.getKitchens = exports.isOpen = exports.toggleKitchen = exports.getKitchen = exports.addReview = exports.addKitchen = void 0;
const error_1 = require("../middleware/error");
const CloudKitcehn_1 = require("../models/CloudKitcehn");
const User_1 = require("../models/User");
const utility_class_1 = require("../utils/utility-class");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../middleware/cloudinary");
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
exports.getKitchen = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { restaurant } = req.params;
    const kitchen = await CloudKitcehn_1.Kitchen.findById(restaurant);
    if (!kitchen)
        return next(new error_1.ErrorHandler(404, "Kitchen Not Found"));
    return res.status(200).json({
        success: true,
        kitchen
    });
});
// Toggle kitchen status
exports.toggleKitchen = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { restaurant } = req.params;
    if (!restaurant)
        return next(new error_1.ErrorHandler(403, "Unauthorized"));
    const kitchen = await CloudKitcehn_1.Kitchen.findById(restaurant);
    if (!kitchen)
        return next(new error_1.ErrorHandler(404, "Kitchen not found"));
    await kitchen.updateOne({ isOpenNow: !kitchen.isOpenNow });
    res.status(200).json({
        success: true,
        message: `${kitchen.name} is ${kitchen.isOpenNow ? "close" : "open"} now`
    });
});
exports.isOpen = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { restaurant } = req.params;
    const kitchen = await CloudKitcehn_1.Kitchen.findById(restaurant).select("isOpenNow name");
    if (!kitchen)
        return next(new error_1.ErrorHandler(404, "Kitchen not found"));
    res.status(200).json({
        success: true,
        kitchen
    });
});
exports.getKitchens = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const kitchens = await CloudKitcehn_1.Kitchen.find({ isOpenNow: true });
    return res.status(200).json({
        success: true,
        kitchens
    });
});
exports.updateKitchen = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const kitchen = await CloudKitcehn_1.Kitchen.findById(id);
    if (!kitchen)
        return next(new error_1.ErrorHandler(404, "User Not found"));
    const photoPath = req.file?.path;
    if (!photoPath)
        return next(new error_1.ErrorHandler(400, "Upload photo"));
    const response = await (0, cloudinary_1.uploadOnCloudinary)(photoPath);
    kitchen.photo.public_id = response?.public_id || "";
    kitchen.photo.url = response?.url || "";
    await kitchen.save();
    return res.status(200).json({
        success: true,
        message: "Profile Updated"
    });
});
