"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.registerUser = void 0;
const utility_class_1 = require("../utils/utility-class");
const User_1 = require("../models/User");
const cloudinary_1 = require("../middleware/cloudinary");
const error_1 = require("../middleware/error");
exports.registerUser = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { name, email, mobile, _id, photo } = req.body;
    const alrUser = await User_1.User.findById(_id);
    if (alrUser) {
        return res.status(200).json({
            success: true,
            message: `Welcome ${alrUser.name}`,
        });
    }
    const user = await User_1.User.create({ name, email, mobile, _id, photo });
    if (!photo) {
        const photoPath = req.file?.path;
        if (!photoPath)
            return next(new error_1.ErrorHandler(400, "Upload photo"));
        const response = await (0, cloudinary_1.uploadOnCloudinary)(photoPath);
        user.photo.public_id = response?.public_id || "";
        user.photo.url = response?.url || "";
        await user.save();
    }
    res.status(201).json({
        success: true,
        message: `Welcome ${user.name}`,
    });
});
exports.getUser = (0, utility_class_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const user = await User_1.User.findById(id);
    res.status(200).json({
        success: true,
        user
    });
});
