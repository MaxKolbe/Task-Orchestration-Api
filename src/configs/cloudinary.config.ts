import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), ".env")
})

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME!.toString(), 
    api_key: process.env.CLOUDINARY_KEY!.toString(),
    api_secret: process.env.CLOUDINARY_SECRET!.toString(),
});

export default cloudinary