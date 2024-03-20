import { NextFunction, Request, Response } from "express"
import { ErrorHandler } from "./error"
import { User } from "../models/User";

export const authRoles = (...roles:string[])=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
        const {user} = req.query;
        const findUser = await User.findById(user);
        if(!roles.includes(findUser?.role!)){
            return next(new ErrorHandler(403,"Unauthorized"))
        }
        next();
    }
}