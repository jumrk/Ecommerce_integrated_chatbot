const express = require('express');
const voucherController = require('../controller/voucher/VoucherController');

const router = express.Router();

// Get all vouchers
router.get('/', voucherController.getAllVouchers);

// Get a single voucher by ID
router.get('/:id', voucherController.getVoucherById);

// Create a new voucher
router.post('/create-voucher', voucherController.createVoucher);

// Update a voucher by ID
router.put('/update-voucher/:id', voucherController.updateVoucher);

// Delete a voucher by ID
router.delete('/delete-voucher/:id', voucherController.deleteVoucher);

module.exports = router;