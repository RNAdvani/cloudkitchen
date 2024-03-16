import mongoose from "mongoose";
import { IDishes } from "../schemas/dishes.schema";

const dishSchema = new mongoose.Schema<IDishes>({
    name:{
        type:String,
        required:[true,"Please enter Dish Name"]
    },
    price:{
        type:Number,
        required:[true,"Please enter Dish Price"]
    },
    description:{
        type:String,
        required:[true,"Please enter Dish Name"]
    },
    photo:{
        url:{
            type:String,
        },
        public_id:{
            type:String
        }
    },
    restaurant: {
        type:mongoose.Schema.ObjectId,
        ref:"kitchens"
    },
    typeOfDish:{
        type:String,
        enum:["veg","non-veg"]
    },
    isAvailableInJain:Boolean,
    allergens:{
        type:String,
        default:"None"
    },
    createdAt:Date,
    updatedAt:Date,
},{
    timestamps:true
})

export const Dish = mongoose.model("dishes",dishSchema);