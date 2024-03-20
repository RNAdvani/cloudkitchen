import express from "express"
import { addKitchen } from "../controller/kitchen.controller";

const app = express.Router();

app.post("/add",addKitchen)


export {app as kitchenRoutes}