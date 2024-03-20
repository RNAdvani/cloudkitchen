import { ErrorHandler } from "../middleware/error";
import { Order } from "../models/Order";
import { TryCatch } from "../utils/utility-class";

export const createOrder = TryCatch(async(req,res,next)=>{
    const {items,total,subTotal,discount,deliveryCharges,address} = req.body;
    const {user,restaurant} = req.query
    if(!user) return next(new ErrorHandler(400,"Kindly Login to place Order"));

    const order = await Order.create({items,total,subTotal,discount,deliveryCharges,restaurant,user,address})

    res.status(201).json({
        success:true,
        message:"Order Placed successfully"
    });
}) 

export const viewOrder = TryCatch(async(req,res,next)=>{
    const {id} = req.params;

    const order = await Order.findById(id);

    if(!order) return next(new ErrorHandler(404,"Order Not Found"));

    res.status(200).json({
        success:true,
        order
    });
})

export const allOrders = TryCatch(async(req,res,next)=>{
    const {user} = req.query;

    if(!user) return next(new ErrorHandler(404,"Kindly Login to view Your Orders"))

    const orders = await Order.find({user});

    res.status(200).json({
        success:true,
        orders
    })
});

export const receivedOrders = TryCatch(async(req,res,next)=>{
    const {kitchen} = req.params;

    if(!kitchen) return next(new ErrorHandler(404,"Not Found"));
    
    const orders = await Order.find({restaurant:kitchen});

    res.status(200).json({
        success:true,
        orders
    })
});

export const updateOrderStatus = TryCatch(async(req,res,next)=>{
    const {id} = req.params;

    if(!id) return next(new ErrorHandler(400,"Bad Request"));

    const order = await Order.findById(id);

    if(!order) return next(new ErrorHandler(404,"Order Not Found"))

    switch(order.status){
        case "accepted":order.status = "preparing";
        break;
        case "preparing":order.status = "delivering";
        break;
        default:order.status = "delivering"
    }

    await order.save();

    res.status(200).json({
        success:true,
        message:`Order status updated to ${order.status}`
    })
});

