import express from "express"
import { getDashboardStats } from "../controller/admin.controller";

const app = express.Router();

app.get("/dashboard/:restaurant",getDashboardStats)


export {app as adminRoutes}