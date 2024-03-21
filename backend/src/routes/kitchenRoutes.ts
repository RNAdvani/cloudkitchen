import express from "express"
import { addKitchen, addReview } from "../controller/kitchen.controller";
import { authRoles } from "../middleware/authRoles";

const app = express.Router();

app.post("/add",addKitchen)
app.post("/review/:restaurant", addReview);

export {app as kitchenRoutes}