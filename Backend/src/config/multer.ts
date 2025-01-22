import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary'; // Ensure you have configured your cloudinary instance
import path from 'path'
import fs from 'fs'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary, 
    params: async (req, file) => ({
        folder: 'uploads',
        format: 'jpeg',
        public_id: `${Date.now()}-${file.originalname}`, 
    })
});
// const uploadDir = path.join(__dirname, 'public', 'uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       // Specify the folder to store files
//       cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//       // Set the file name
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
//   });

const upload = multer({ storage });

export default upload;
