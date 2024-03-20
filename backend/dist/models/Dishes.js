"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dish = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dishSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter Dish Name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter Dish Price"]
    },
    description: {
        type: String,
        required: [true, "Please enter Dish Name"]
    },
    photo: {
        url: {
            type: String,
        },
        public_id: {
            type: String
        }
    },
    restaurant: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "kitchens"
    },
    cuisine: {
        type: String,
        required: [true, "Please enter Dish Cuisine"]
    },
    typeOfDish: {
        type: String,
        enum: ["veg", "non-veg"]
    },
    isAvailableInJain: Boolean,
    allergens: {
        type: String,
        default: "None"
    },
    createdAt: Date,
    updatedAt: Date,
}, {
    timestamps: true
});
exports.Dish = mongoose_1.default.model("dishes", dishSchema);
