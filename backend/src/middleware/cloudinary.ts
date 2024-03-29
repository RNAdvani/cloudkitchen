import {v2 as cloudinary} from "cloudinary"
import  fs  from 'fs'
import dotenv from 'dotenv'
dotenv.config({path:"../backend/config.env"})

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
  });

export const uploadOnCloudinary =async (localFilePath: string) =>{
    try {
        if(!localFilePath) return null
        const res = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        });
        return res
    } catch (error) {
        console.log(error) 
        fs.unlinkSync(localFilePath) // Remove the locally saved temp file as the upload got failed
        return null
    }
}

