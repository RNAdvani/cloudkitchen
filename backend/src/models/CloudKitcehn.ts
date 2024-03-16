import mongoose from "mongoose";
import { IKitchen } from "../schemas/kitchen.schema";

const kitchenSchema = new mongoose.Schema<IKitchen>({
    name:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true
    },
    isOpenNow:{
        type:Boolean,
        default:false
    },
    photo:{
        public_id:String,
        url:String
    },
    requestStatus:{
        type:String,
        default:"reviewing"
    },
    closedPermanent:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export const Kitchen = mongoose.model("kitchens",kitchenSchema);