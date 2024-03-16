import { Request,Response,NextFunction } from "express";
import { TryCatch } from "../utils/utility-class";
import { User } from "../models/User";
import { uploadOnCloudinary } from "../middleware/cloudinary";
import { ErrorHandler } from "../middleware/error";
import exp from "constants";


export const registerUser = TryCatch(async(req:Request,res:Response,next:NextFunction)=>{
    const {name,email,mobile,_id,photo}  = req.body;

    const alrUser = await User.findById(_id)

    if(alrUser){
        return res.status(200).json({
            success:true,
            message:`Welcome ${alrUser.name}`,
        })
    }

     const user = await User.create({name,email,mobile,_id,photo});

    if(!photo){const photoPath = req.file?.path
    if(!photoPath)  return next(new ErrorHandler(400,"Upload photo"));

    const response = await uploadOnCloudinary(photoPath!);

    user.photo.public_id = response?.public_id || ""

    user.photo.url = response?.url || ""

    await user.save();
}

    res.status(201).json({ 
        success:true,
        message:`Welcome ${user.name}`,
    })
});

export const getUser = TryCatch(async(req,res,next)=>{
    const {id} = req.params;

    const user = await User.findById(id);

    res.status(200).json({
        success:true,
        user
    })
})

