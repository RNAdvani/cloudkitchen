"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDb = (mongoUri) => {
    mongoose_1.default.connect(mongoUri, {
        dbName: "cloudkitchen"
    }).then(c => console.log(`Db connected on ${c.connection.host}`)).catch(err => console.log(err));
};
exports.connectDb = connectDb;
const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.TryCatch = TryCatch;
