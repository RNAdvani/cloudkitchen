import express from "express"
import { addDish } from "../controller/dishes.controller";

const app = express.Router();

app.post("/add/:restaurant",addDish)


export {app as dishesROutes}