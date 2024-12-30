import { v2 as cloudinary } from 'cloudinary';
export const sendImageToCloudinary = () => {
  // Configuration
  cloudinary.config({
    cloud_name: 'dsoljksm7',
    api_key: '259543438675325',
    api_secret: 'BjmKv09vwcweISsjWO0E_l7NwuI', // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  cloudinary.uploader.upload(
    'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    {
      public_id: 'shoes',
    },
    function (error, result) {
      console.log(result);
    },
  );
};
