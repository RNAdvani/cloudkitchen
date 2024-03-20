import { uploadOnCloudinary } from "../middleware/cloudinary";
import { ErrorHandler } from "../middleware/error";
import { Dish } from "../models/Dishes";
import { TryCatch } from "../utils/utility-class";

export const addDish = TryCatch(async (req,res,next)=>{
    const {name,description,price,typeOfDish,cuisine,isAvailableInJain,allergens} = req.body;

    const {restaurant} = req.params;

    const dish = await Dish.create({name,description,price,restaurant,typeOfDish,isAvailableInJain,cuisine,allergens})

    const path = req.file?.path

    const resp = await uploadOnCloudinary(path!);

    dish.photo.public_id = resp?.public_id!;

    dish.photo.url = resp?.url!;

    await dish.save();

    res.status(201).json({
        success:true,
        message:`${dish.name} added to your restaurant`
    })

});

export const updateDish = TryCatch(async(req,res,next)=>{
    const {id} = req.params;
    const {name,description,price,typeOfDish,isAvailableInJain,allergens} = req.body;

    const dish = await Dish.findByIdAndUpdate(id,{name,description,price,typeOfDish,isAvailableInJain,allergens});

    if(!dish) return next(new ErrorHandler(404,"Dish not Found"));

    const path = req.file?.path;

    const resp = await uploadOnCloudinary(path!);

    dish.photo.public_id = resp?.public_id!;

    dish.photo.url = resp?.url!;

    await dish.save();

     res.status(200).json({
        success:true,
        message:`${dish.name} updated`
    })
});


export const deleteDish = TryCatch(async(req,res,next)=>{
    const {id} = req.params;
    const dish = await Dish.findById(id);
    if(!dish) return next(new ErrorHandler(404,"Dish not Found"));

    await dish.deleteOne();

    res.status(200).json({
        success:true,
        message:`${dish.name} Deleted Successfully`
    })
});

// Outlet admin Routes

