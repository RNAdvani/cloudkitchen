import mongoose from "mongoose"
import { funcType } from "../types/constants";
import { NextFunction, Request, Response } from "express";

export const connectDb = (mongoUri:string)=>{
   mongoose.connect(mongoUri,{
   }).then(c=>console.log(`Db connected on ${c.connection.host}`)).catch(err=>console.log(err));
}

export const TryCatch = (func:funcType) => (req:Request,res:Response,next:NextFunction)=>{
   return Promise.resolve(func(req,res,next)).catch(next)
}
