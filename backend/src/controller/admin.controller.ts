import mongoose, { Mongoose } from "mongoose";
import { ErrorHandler } from "../middleware/error";
import { Dish } from "../models/Dishes";
import { Order } from "../models/Order";
import { TryCatch } from "../utils/utility-class";

export const getDashboardStats = TryCatch(async(req,res,next)=>{
    const {restaurant} = req.params;
    const today = new Date()
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate()-7);

    
    const cusineCountPromise  = Dish.aggregate([{
        $match: {
          restaurant:new mongoose.Types.ObjectId('65fb115b9ea231becc2b8e7f')
        }
      },
       {
        $group: {
            _id: "$cuisine", 
            count: { $sum: 1 } 
          }
      }])
    const [orders,cuisineCount] = await Promise.all([Order.find({restaurant,createdAt:{$gte:sevenDaysAgo,$lte:today}}).select("createdAt"),cusineCountPromise])

    const numberOfOrders:number[] = new Array(7).fill(0);    

    
    orders.forEach((i)=>{
        const index  = Math.ceil(today.getDay()-i.createdAt.getDay()+7)%7;
        numberOfOrders[index]++;
    })
    
    const dashboard = {
        numberOfOrders : numberOfOrders.reverse(),
        cuisineCount
    }
    console.log(numberOfOrders)

    res.status(200).json({
        success:true,
        dashboard
    })
});