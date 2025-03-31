const express = require('express');
const router = express.Router();
const { createPayment, vnpayReturn, vnpayIpn, queryDr, refund } = require('../controller/order&payment/vnpayController');

// Route tạo thanh toán
router.post('/create-payment', createPayment);

// Route xử lý phản hồi từ VNPAY sau khi thanh toán
router.get('/vnpay-return', vnpayReturn);

// Route xử lý IPN (Instant Payment Notification) từ VNPAY
router.get('/vnpay-ipn', vnpayIpn);

// Route truy vấn giao dịch
router.post('/query-dr', queryDr);

// Route hoàn tiền giao dịch
router.post('/refund', refund);

module.exports = router;
