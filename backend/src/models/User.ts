import mongoose from "mongoose";
import { IUser } from "../schemas/user.schema";

const userSchema = new mongoose.Schema<IUser>({
    _id:{
        type:String,
        required:[true,"Please Enter id"]
    },
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        trim:true
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Please enter Name"],
        lowercase:true,
        trim:true
    },
    mobile:{
        type:String,
        required:[true,"Please Enter Your Mobile Number"],
        trim:true
    },
    role: {
        type:String,
        enum:["admin" , "chef" , "user"],
        default:"user"
    },
    photo:{
        url:{
            type:String,
        },
        public_id:{
            type:String
        }
    },
    createdAt:Date,
    updatedAt:Date,
},{
    timestamps:true
})



export const User = mongoose.model("users",userSchema)