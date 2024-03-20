import { ErrorHandler } from "../middleware/error";
import { Kitchen } from "../models/CloudKitcehn";
import { User } from "../models/User";
import { TryCatch } from "../utils/utility-class";


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

