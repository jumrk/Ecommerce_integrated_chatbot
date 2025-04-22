const express = require('express');
const router = express.Router();
const { getAllOrder, getOrderByIdForUser, getOrderById, addOrder, getOrdersByUserId, updateOrder, cancelOrder } = require('../controller/order&payment/orderController')
const { verifyToken } = require('../middleware/auth');
router.get('/getAllOrder', getAllOrder);
router.get('/getOrderById/:id', getOrderById);
router.get('/user/:id', getOrdersByUserId)
router.get('/user', verifyToken, getOrderByIdForUser)
router.post('/add-order', verifyToken, addOrder)
router.put('/cancel-order/:id', verifyToken, cancelOrder)
router.put('/update-order/:id', updateOrder);
module.exports = router;