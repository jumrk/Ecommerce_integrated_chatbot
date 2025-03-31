const express = require('express');
const router = express.Router();

const {
    addPaymentMethod,
    deletePaymentMethod,
    getListPaymentMethod,
    getPaymentMethodById,
    updatePaymentMethod
} = require('../controller/order&payment/paymentMethodController');

router.get('/get-list-payment-method', getListPaymentMethod);
router.get('/get-payment-by-id/:id', getPaymentMethodById);
router.post('/post-payment-method', addPaymentMethod);
router.put('/update-payment-method/:id', updatePaymentMethod);
router.delete('/delete-payment-method/:id', deletePaymentMethod);

module.exports = router