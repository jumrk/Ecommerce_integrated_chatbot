const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const {
    getAddresses,
    getAddressById,
    createAddress,
    updateAddress,
    deleteAddress,
} = require("../controller/address/addressController");

// Lấy danh sách địa chỉ
router.get("/", verifyToken, getAddresses);

// Lấy chi tiết một địa chỉ
router.get("/:id", verifyToken, getAddressById);

// Thêm địa chỉ mới
router.post("/", verifyToken, createAddress);

// Cập nhật địa chỉ
router.put("/:id", verifyToken, updateAddress);

// Xóa địa chỉ
router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;