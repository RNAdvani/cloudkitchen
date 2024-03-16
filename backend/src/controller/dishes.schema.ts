import { Dish } from "../models/Dishes";
import { TryCatch } from "../utils/utility-class";

export const addDish = TryCatch(async (req,res,next)=>{
    const {name,description,price,restaurant,typeOfDish,isAvailableInJain,allergens,photo} = req.body;

    const dish = await Dish.create({name,description,price,restaurant,typeOfDish,isAvailableInJain,allergens})

    const path = req.file?.path
})