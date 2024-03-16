"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ErrorHandler = ErrorHandler;
const errorMiddleware = (error, req, res, next) => {
    error.statusCode || (error.statusCode = 500);
    error.message || (error.message = "Internal server error");
    console.log(error.stack);
    return res.status(error.statusCode).json({
        success: true,
        message: error.message
    });
};
exports.errorMiddleware = errorMiddleware;
