import { NextFunction, Request, Response } from "express"

export class ErrorHandler extends Error{
    constructor(public statusCode:number,public message:string){
        super(message)
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (error:ErrorHandler,req:Request,res:Response,next:NextFunction)=>{
    error.statusCode ||= 500;
    error.message ||= "Internal server error";

    res.status(error.statusCode).json({
    success:false,
    message:error.message
   })
}