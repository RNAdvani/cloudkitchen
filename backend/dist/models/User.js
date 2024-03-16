"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    _id: {
        type: String,
        required: [true, "Please Enter id"]
    },
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter Name"],
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: [true, "Please Enter Your Mobile Number"],
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "chef", "user"],
        default: "user"
    },
    photo: {
        url: {
            type: String,
        },
        public_id: {
            type: String
        }
    },
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true
});
exports.User = mongoose_1.default.model("users", userSchema);
