"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDish = exports.updateDish = exports.addDish = void 0;
const cloudinary_1 = require("../middleware/cloudinary");
const error_1 = require("../middleware/error");
const Dishes_1 = require("../models/Dishes");
const utility_class_1 = require("../utils/utility-class");
exports.addDish = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { name, description, price, typeOfDish, cuisine, isAvailableInJain, allergens } = req.body;
    const { restaurant } = req.params;
    const dish = await Dishes_1.Dish.create({ name, description, price, restaurant, typeOfDish, isAvailableInJain, cuisine, allergens });
    const path = req.file?.path;
    const resp = await (0, cloudinary_1.uploadOnCloudinary)(path);
    dish.photo.public_id = resp?.public_id;
    dish.photo.url = resp?.url;
    await dish.save();
    res.status(201).json({
        success: true,
        message: `${dish.name} added to your restaurant`
    });
});
exports.updateDish = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, typeOfDish, isAvailableInJain, allergens } = req.body;
    const dish = await Dishes_1.Dish.findByIdAndUpdate(id, { name, description, price, typeOfDish, isAvailableInJain, allergens });
    if (!dish)
        return next(new error_1.ErrorHandler(404, "Dish not Found"));
    const path = req.file?.path;
    const resp = await (0, cloudinary_1.uploadOnCloudinary)(path);
    dish.photo.public_id = resp?.public_id;
    dish.photo.url = resp?.url;
    await dish.save();
    res.status(200).json({
        success: true,
        message: `${dish.name} updated`
    });
});
exports.deleteDish = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const dish = await Dishes_1.Dish.findById(id);
    if (!dish)
        return next(new error_1.ErrorHandler(404, "Dish not Found"));
    await dish.deleteOne();
    res.status(200).json({
        success: true,
        message: `${dish.name} Deleted Successfully`
    });
});
// Outlet admin Routes
