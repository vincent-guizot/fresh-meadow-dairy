const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

const uploadToCloudinaryOrLocal = async (file, req) => {
    if (!file) return null;

    // Check if Cloudinary credentials are present
    const isCloudinaryConfigured = Boolean(
        process.env.CLOUDINARY_CLOUD_NAME &&
        process.env.CLOUDINARY_API_KEY &&
        process.env.CLOUDINARY_API_SECRET
    );

    if (isCloudinaryConfigured) {
        return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: 'cms-products', resource_type: 'image' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result.secure_url);
                }
            );
            stream.end(file.buffer);
        });
    }

    // Fallback: save to local uploads directory
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalname) || '.jpg';
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}-${cleanName}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const protocol = req.protocol || 'http';
    const host = req.get('host') || `localhost:${process.env.PORT || 3000}`;
    return `${protocol}://${host}/uploads/${filename}`;
};

module.exports = {
    uploadToCloudinaryOrLocal
};
