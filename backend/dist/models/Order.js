"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: String
    },
    restaurant: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "kitchens"
    },
    address: {
        type: String,
        // required:[true,"Enter address"]
    },
    items: [{
            name: String,
            photo: {
                public_id: String,
                url: String
            },
            price: Number,
            quantity: Number
        }],
    subTotal: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    deliveryCharges: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["accepted", "preparing", "delivering"],
        default: "accepted"
    }
}, {
    timestamps: true,
    strict: false
});
exports.Order = mongoose_1.default.model("orders", orderSchema);
