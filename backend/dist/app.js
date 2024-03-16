"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const utility_class_1 = require("./utils/utility-class");
const userRoutes_1 = require("./routes/userRoutes");
const error_1 = require("./middleware/error");
dotenv_1.default.config({ path: "../backend/config.env" });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
(0, utility_class_1.connectDb)(`${process.env.MONGO_URI}`);
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.use("/api/v1/user", userRoutes_1.userRoutes);
app.use(error_1.errorMiddleware);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
exports.default = app;
