import express from "express"
import { addDish, deleteDish, getAllMyDishes, updateDish } from "../controller/dishes.controller";
import { authRoles } from "../middleware/authRoles";
import { upload } from "../middleware/multer";

const app = express.Router();

app.post("/add/:restaurant",upload,addDish);
app.delete("/delete/:id",upload,deleteDish);
app.put("/update/:id",updateDish);
app.get("/all/:restaurant",getAllMyDishes)


export {app as dishesROutes}   