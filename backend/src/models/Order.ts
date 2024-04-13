import mongoose, { Mongoose, mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    user:{
        type:String
    },
    restaurant:{
        type:mongoose.Schema.ObjectId,
        ref:"kitchens"
    },
    address:{
        type:String,
        // required:[true,"Enter address"]
    },
    items:[{
        name:String,
        photo:{
            public_id:String,
            url:String
        },
        price:Number,
        quantity:Number
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
    },
    status:{
        type:String,
        enum:["accepted","preparing","delivering"],
        default:"accepted"
    }
},{
    timestamps:true,
    strict:false
});

export const Order = mongoose.model("orders",orderSchema);