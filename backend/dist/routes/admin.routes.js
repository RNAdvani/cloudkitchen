"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controller/admin.controller");
const app = express_1.default.Router();
exports.adminRoutes = app;
app.get("/dashboard/:restaurant", admin_controller_1.getDashboardStats);
