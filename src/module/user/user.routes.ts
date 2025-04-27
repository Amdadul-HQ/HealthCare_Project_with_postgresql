import express from "express";
import { userController } from "./user.controller";
import auth from "../../app/middleWares/auth";
import { UserRole } from "@prisma/client";
import { fileUploder } from "../../app/helper/fileUploader";

const router = express.Router();

import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'ddzk2sd7f', 
        api_key: '637516894516234', 
        api_secret: 'bVBUYQdaFa3cPYzBVdY45VJovKo' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();



router.post("/",
    auth(UserRole.SUPER_ADMIN,UserRole.ADMIN),
    fileUploder.upload.single('file'), userController.createAdmin)

export const UserRoutes = router;