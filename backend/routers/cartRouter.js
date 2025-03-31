const express = require('express');
const router = express.Router();
const { addToCart, getCart, updateCart, deleteCart } = require('../controller/cart/cartController');
const { verifyToken } = require('../middleware/auth');

router.post('/add-to-cart', verifyToken, addToCart);
router.get('/get-cart', verifyToken, getCart);
router.put('/update-cart/:id', verifyToken, updateCart);
router.delete('/delete-cart/:id', verifyToken, deleteCart);
module.exports = router;


