import express from 'express'
import dotenv from "dotenv";
import { connectDb } from './utils/utility-class';
import { userRoutes } from './routes/userRoutes';
import { errorMiddleware } from './middleware/error';
dotenv.config({path:"../backend/config.env"})
import cors from "cors"
import morgan from 'morgan'
import { kitchenRoutes } from './routes/kitchenRoutes';
import { dishesROutes } from './routes/dishesRoutes';
import { orderRoutes } from './routes/orderRoutes';
import { adminRoutes } from './routes/admin.routes';

const app = express();

connectDb(`${process.env.MONGO_URI}`);
app.use(express.json());
app.use(morgan("dev"))
app.use(cors())

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/kitchen",kitchenRoutes);
app.use("/api/v1/dish",dishesROutes);
app.use("/api/v1/order",orderRoutes);
app.use("/api/v1/admin",adminRoutes);


app.use(errorMiddleware);

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})


export default app; 