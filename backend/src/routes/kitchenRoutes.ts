import express from "express"
import { addKitchen } from "../controller/kitchen.controller";
import { authRoles } from "../middleware/authRoles";

const app = express.Router();

app.post("/add",authRoles("admin"),addKitchen)


export {app as kitchenRoutes}