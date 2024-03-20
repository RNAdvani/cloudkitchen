"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addKitchen = void 0;
const error_1 = require("../middleware/error");
const CloudKitcehn_1 = require("../models/CloudKitcehn");
const User_1 = require("../models/User");
const utility_class_1 = require("../utils/utility-class");
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
