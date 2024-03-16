import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId
    },
    items:[{
        name:String,
        photo:{
            public_id:String,
            url:String
        },
        price:Number
    }],
    subTotal:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    deliveryCharges:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
},{
    timestamps:true
});

export const Order = mongoose.model("orders",orderSchema);