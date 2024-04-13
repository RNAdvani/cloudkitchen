import express from 'express'
import { allOrders, createOrder, currentOrders, receivedOrders, updateOrderStatus} from '../controller/orders.controller';
import { authRoles } from '../middleware/authRoles';

const app = express.Router();

app.post("/new",createOrder);
app.get("/my",allOrders);
app.get("/received/:kitchen",receivedOrders)
app.post("/update/:id",updateOrderStatus);
app.get("/current/:restaurant",currentOrders);



export {app as orderRoutes}