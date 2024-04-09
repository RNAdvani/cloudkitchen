import { stringify } from "querystring";
import { ErrorHandler } from "../middleware/error";
import { Kitchen } from "../models/CloudKitcehn";
import { User } from "../models/User";
import { TryCatch } from "../utils/utility-class";
import mongoose, { Mongoose } from "mongoose";



export const addKitchen = TryCatch(async(req,res,next)=>{
    const {user} = req.query;

    if(!user) return next(new ErrorHandler(400,"Unauth"))

    const {name} = req.body;

    const kitchenPromise = Kitchen.create({owner:user,name});

    const findUserPromise =  User.findById(user);

    const [kitchen,findUser] = await Promise.all([kitchenPromise,findUserPromise]);

    if(findUser) {
        findUser.owner = kitchen._id;
        findUser.role = "chef";
        await findUser.save();
    };

    res.status(201).json({
        success:true,
        kitchen
    })
});

export const addReview = TryCatch(async(req,res,next)=>{
    const {restaurant} = req.params;
    const {user} = req.query!;
    const {rating,review}:{rating:number,review:string} = req.body;
    const findUserPromise =  User.findById(user);
    const kitchenPromise = Kitchen.findById(restaurant).select("reviews");


    const [findUser,kitchen] = await Promise.all([findUserPromise,kitchenPromise])

    if(!findUser) return next(new ErrorHandler(400,"Bad"))

    if(!kitchen)  return next(new ErrorHandler(404,"Not found"));

    kitchen.reviews.push({user:findUser._id,rating,review});
    
    await kitchen.save();

    const [piplelinePromise] : {_id:mongoose.Types.ObjectId,ratinratingCount:number,ratings:number}[] = await Kitchen.aggregate([
        {
          $unwind:"$reviews"
        },
        {
          $group: {
            _id: "$_id",
            ratingCount: {
              $avg: "$reviews.rating"
            }      
            }
        },
        {
            $match: {"_id" :new mongoose.Types.ObjectId(restaurant)}
          },
        {
          $set: {
            "ratings": "$ratingCount"
          }
        }
      ]);

      
      kitchen.ratings = Number(piplelinePromise.ratings.toFixed(1));

      await kitchen.save();


    res.status(200).json({
        success:true,
        message:"Review Added",
    })
});


// Toggle kitchen status

export const toggleKitchen = TryCatch(async(req,res,next)=>{
    const {restaurant} = req.params;
    if(!restaurant) return next(new ErrorHandler(403,"Unauthorized"));

    const kitchen = await Kitchen.findById(restaurant)

    if(!kitchen) return next(new ErrorHandler(404,"Kitchen not found"));

    await kitchen.updateOne({isOpenNow:!kitchen.isOpenNow});

    res.status(200).json({
        success:true,
        message: `${kitchen.name} is ${kitchen.isOpenNow?"close" :"open"} now`
    })
});

export const isOpen = TryCatch(async(req,res,next)=>{
    const {restaurant} = req.params;
    const kitchen = await Kitchen.findById(restaurant).select("isOpenNow name")
    if(!kitchen) return next(new ErrorHandler(404,"Kitchen not found"));

    res.status(200).json({
      success:true,
      kitchen
    })
})

