const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Hàm tạo middleware upload với thư mục động
const uploadImage = (folderName) => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(__dirname, `../public/images/${folderName}`);

            // Tạo thư mục nếu chưa tồn tại
            try {
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                    console.log("Thư mục đã được tạo:", uploadPath);
                }
                cb(null, uploadPath);
            } catch (err) {
                console.error("Lỗi khi tạo thư mục:", err); // Log lỗi
                cb(new Error("Không thể tạo thư mục upload"));
            }
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + path.extname(file.originalname)); // Đặt tên file duy nhất
        },
    });

    // Chỉ chấp nhận ảnh JPG, PNG, JPEG
    const fileFilter = (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Chỉ chấp nhận file ảnh (JPG, JPEG, PNG)"), false);
        }
    };

    // Giới hạn kích thước file (ví dụ: 5MB)
    const limits = {
        fileSize: 5 * 1024 * 1024, // 5MB
    };

    return multer({ storage, fileFilter, limits });
};

module.exports = uploadImage;
