"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Kitchen = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const kitchenSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Kitche Name"]
    },
    owner: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "users"
    },
    isOpenNow: {
        type: Boolean,
    },
    photo: {
        public_id: String,
        url: String
    }
}, {
    timestamps: true
});
exports.Kitchen = mongoose_1.default.model("kitchens", kitchenSchema);
