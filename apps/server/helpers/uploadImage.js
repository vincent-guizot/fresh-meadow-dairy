const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

/**
 * Validates whether Cloudinary environment variables are properly provided.
 * Cloudinary feature is enabled ONLY IF:
 * 1. CLOUDINARY_URL is present and starts with 'cloudinary://', OR
 * 2. CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET are all provided,
 *    non-empty, and not default placeholders.
 */
const isCloudinaryConfigured = () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME ? process.env.CLOUDINARY_CLOUD_NAME.trim() : '';
    const apiKey = process.env.CLOUDINARY_API_KEY ? process.env.CLOUDINARY_API_KEY.trim() : '';
    const apiSecret = process.env.CLOUDINARY_API_SECRET ? process.env.CLOUDINARY_API_SECRET.trim() : '';
    const cloudinaryUrl = process.env.CLOUDINARY_URL ? process.env.CLOUDINARY_URL.trim() : '';

    if (cloudinaryUrl && cloudinaryUrl.startsWith('cloudinary://')) {
        return true;
    }

    if (
        cloudName &&
        apiKey &&
        apiSecret &&
        cloudName !== 'your_cloud_name' &&
        apiKey !== 'your_api_key' &&
        apiSecret !== 'your_api_secret'
    ) {
        return true;
    }

    return false;
};

// Initialize Cloudinary SDK ONLY if environment credentials are provided
if (isCloudinaryConfigured()) {
    if (process.env.CLOUDINARY_URL) {
        cloudinary.config();
    } else {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME.trim(),
            api_key: process.env.CLOUDINARY_API_KEY.trim(),
            api_secret: process.env.CLOUDINARY_API_SECRET.trim()
        });
    }
}

/**
 * Upload buffer directly to Cloudinary cloud storage
 */
const uploadToCloudinary = (file) => {
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
};

/**
 * Save file locally into /uploads directory
 */
const saveToLocalStorage = (file, req) => {
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const ext = path.extname(file.originalname) || '.jpg';
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const filename = `${Date.now()}-${cleanName}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    fs.writeFileSync(filePath, file.buffer);

    const protocol = req && req.protocol ? req.protocol : 'http';
    const host = req && req.get ? req.get('host') : `localhost:${process.env.PORT || 3120}`;
    return `${protocol}://${host}/uploads/${filename}`;
};

/**
 * Main upload handler with condition logic:
 * - If Cloudinary credentials are provided in env: upload to Cloudinary.
 * - If Cloudinary is NOT provided in env: Cloudinary upload does NOT run,
 *   and system saves the file to local storage (/uploads).
 */
const uploadToCloudinaryOrLocal = async (file, req) => {
    if (!file) return null;

    // Logic: Jika Cloudinary disertakan dalam env, jalankan fitur Cloudinary
    if (isCloudinaryConfigured()) {
        try {
            console.log('[Storage] Cloudinary terkonfigurasi. Mengunggah gambar ke Cloudinary...');
            const cloudUrl = await uploadToCloudinary(file);
            console.log(`[Storage] Sukses unggah ke Cloudinary: ${cloudUrl}`);
            return cloudUrl;
        } catch (error) {
            console.warn(`[Storage] Gagal unggah ke Cloudinary (${error.message}). Mengalihkan ke penyimpanan lokal...`);
            return saveToLocalStorage(file, req);
        }
    }

    // Logic: Jika Cloudinary TIDAK disertakan, fitur upload Cloudinary TIDAK DIJALANKAN
    console.log('[Storage] Cloudinary TIDAK disertakan dalam .env. Fitur upload Cloudinary dinonaktifkan.');
    console.log('[Storage] Menyimpan gambar ke penyimpanan lokal (/uploads)...');
    return saveToLocalStorage(file, req);
};

module.exports = {
    isCloudinaryConfigured,
    uploadToCloudinary,
    saveToLocalStorage,
    uploadToCloudinaryOrLocal,
    uploadImage: uploadToCloudinaryOrLocal
};
