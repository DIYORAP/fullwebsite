const cloudinary = require("cloudinary").v2; // Make sure you're using v2
var { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
// Initialize Cloudinary storage
var storage =  CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'wanderlust_DEV',
        allowed_formats: ["png", "jpg", "jpeg"], // Corrected typo in "allowed_formats"
    }
});

module.exports = {
    cloudinary,
    storage
};
