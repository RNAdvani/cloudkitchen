import express from 'express'
import { allOrders, createOrder } from '../controller/orders.controller';
import { authRoles } from '../middleware/authRoles';

const app = express.Router();

app.post("/new",authRoles("user"),createOrder);
app.get("/my",allOrders);



export {app as orderRoutes}