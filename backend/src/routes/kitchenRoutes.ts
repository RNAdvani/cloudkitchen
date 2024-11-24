import express from "express"
import { addKitchen, addReview, getKitchen, getKitchens, isOpen, toggleKitchen, updateKitchen } from "../controller/kitchen.controller";
import { authRoles } from "../middleware/authRoles";
import { upload } from "../middleware/multer";

const app = express.Router();

app.post("/add",addKitchen)
app.post("/review/:restaurant", addReview);
app.post("/toggle/:restaurant", toggleKitchen);
app.get("/open/:restaurant",isOpen)
app.get("/all",getKitchens)
app.get("/restaurant/:restaurant",getKitchen)
app.post("/update/:id",upload,updateKitchen)

export {app as kitchenRoutes}