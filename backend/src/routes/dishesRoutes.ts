import express from "express"
import { addDish, updateDish } from "../controller/dishes.controller";
import { authRoles } from "../middleware/authRoles";

const app = express.Router();

app.post("/add/:restaurant",authRoles("chef"),addDish);
app.put("/update/:id",authRoles("chef"),updateDish);


export {app as dishesROutes}