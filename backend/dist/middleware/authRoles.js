"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoles = void 0;
const error_1 = require("./error");
const User_1 = require("../models/User");
const authRoles = (...roles) => {
    return async (req, res, next) => {
        const { user } = req.query;
        const findUser = await User_1.User.findById(user);
        if (!roles.includes(findUser?.role)) {
            return next(new error_1.ErrorHandler(403, "Unauthorized"));
        }
        next();
    };
};
exports.authRoles = authRoles;
