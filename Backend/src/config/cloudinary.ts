import { v2 as cloudinary } from 'cloudinary';
cloudinary.config(
    {
        cloud_name:"da2cscj5g",
        api_key:process.env.CLOUDINARI_API,
        api_secret:process.env.CLOUDINARI_SECRET_API
    }
)

console.log(process.env.CLOUDINARI_API);
console.log(process.env.CLOUDINARI_SECRET_API);

export default cloudinary