import express from 'express'
import { allOrders, createOrder, currentOrders, receivedOrders, updateOrderStatus} from '../controller/orders.controller';
import { authRoles } from '../middleware/authRoles';

const app = express.Router();

app.post("/new",authRoles("user"),createOrder);
app.get("/my",authRoles("user"),allOrders);
app.get("/received/:kitchen",authRoles("chef"),receivedOrders)
app.post("/update/:id",authRoles("chef"),updateOrderStatus);
app.get("/current/:restaurant",currentOrders);



export {app as orderRoutes}