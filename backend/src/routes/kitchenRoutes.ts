import express from "express"
import { addKitchen, addReview, isOpen, toggleKitchen } from "../controller/kitchen.controller";
import { authRoles } from "../middleware/authRoles";

const app = express.Router();

app.post("/add",addKitchen)
app.post("/review/:restaurant", addReview);
app.post("/toggle/:restaurant", toggleKitchen);
app.get("/open/:restaurant",isOpen)

export {app as kitchenRoutes}