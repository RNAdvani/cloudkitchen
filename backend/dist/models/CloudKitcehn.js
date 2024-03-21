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
        required: true
    },
    owner: {
        type: String,
    },
    isOpenNow: {
        type: Boolean,
        default: false
    },
    photo: {
        public_id: String,
        url: String
    },
    closedPermanent: {
        type: Boolean,
        default: false
    },
    ratings: {
        type: Number,
        default: 0
    },
    reviews: [{
            user: String,
            rating: Number,
            review: String,
        }]
}, {
    timestamps: true
});
exports.Kitchen = mongoose_1.default.model("kitchens", kitchenSchema);
