import { v2 as cloudinary } from 'cloudinary';
import { log } from 'console';
import fs from "fs";
import { ApiError } from '../utils/ApiError.js';

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async function (localFilePath) {
    
    try {

        if(!localFilePath)  return null

        const response = await cloudinary.uploader
        .upload(
            localFilePath, {
                resource_type: "auto",
            }
        )
        // console.log(`File Uploaded Successfully : ${response.url}`)
        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {        
        fs.unlinkSync(localFilePath)
        return error.msg;
    }

}

export { uploadOnCloudinary }
    
    
    
    