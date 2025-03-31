const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("Received token:", authHeader);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Không có token hoặc token không hợp lệ" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err.message); // Debug lỗi xác minh token
            return res.status(401).json({ success: false, message: "Token không hợp lệ" });
        }

        console.log("Token verified successfully:", decoded); // Debug nếu xác minh thành công
        req.user = decoded;

        next();
    });
};

module.exports = { verifyToken };
