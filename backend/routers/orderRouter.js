const express = require('express');
const router = express.Router();
const { getListOrder, getOrderById, addOrder } = require('../controller/order&payment/orderController')
const { verifyToken } = require('../middleware/auth');
router.get('/getListOrder', getListOrder);
router.get('/getOrderById/:id', getOrderById);
router.post('/add-order', verifyToken, addOrder)
module.exports = router;