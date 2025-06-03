// middleware/multer.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "hotels", // Cloudinary folder
        allowed_formats: ["jpg", "jpeg", "png"],
    },
});

const upload = multer({ storage });

module.exports = upload;
