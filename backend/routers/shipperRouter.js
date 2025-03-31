const express = require('express');
const router = express.Router();
const {
    createShipper,
    getAllShippers,
    getShipperById,
    updateShipper,
    deleteShipper
} = require('../controller/shipper/shipperController');

// Route tạo mới shipper
router.post('/create-shipper', createShipper);

// Route lấy danh sách tất cả shipper
router.get('/', getAllShippers);

// Route lấy thông tin shipper theo ID
router.get('/:id', getShipperById);

// Route cập nhật thông tin shipper
router.put('/update-shipper/:id', updateShipper);

// Route xóa shipper
router.delete('/delete-shipper/:id', deleteShipper);

module.exports = router;