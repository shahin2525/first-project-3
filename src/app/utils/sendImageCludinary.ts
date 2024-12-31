/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';
interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  [key: string]: any; // To account for additional properties
}

cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret, // Click 'View API Keys' above to copy your API secret
});
// export const sendImageToCloudinary = (imageName: string, path: string) => {
//   // Configuration

//   return new Promise((resolve, reject) => {
//     // Upload an image
//     cloudinary.uploader.upload(
//       path,
//       {
//         public_id: imageName,
//       },
//       function (error, result) {
//         if (error) {
//           reject(error);
//         }
//         resolve(result);
//         console.log(result);

//         // Remove the file
//         fs.unlink(path, (err) => {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('file is deleted');
//           }
//         });
//       },
//     );
//   });
// };

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result as CloudinaryUploadResult);
        // delete a file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
