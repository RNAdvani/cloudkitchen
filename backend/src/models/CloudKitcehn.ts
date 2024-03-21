import mongoose from "mongoose";
import { IKitchen } from "../schemas/kitchen.schema";

const kitchenSchema = new mongoose.Schema<IKitchen>({
    name:{
        type:String,
        required:true
    },
    owner:{
        type:String,
    },
    isOpenNow:{
        type:Boolean,
        default:false
    },
    photo:{
        public_id:String,
        url:String
    },
    closedPermanent:{
        type:Boolean,
        default:false
    },
    ratings:{
        type:Number,
        default:0
    },
    reviews:[{
        user:String,
        rating:Number,
        review:String,
    }]
},{
    timestamps:true
})

export const Kitchen = mongoose.model("kitchens",kitchenSchema);