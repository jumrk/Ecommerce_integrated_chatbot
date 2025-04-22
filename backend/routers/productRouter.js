const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getProductSale, getProductBesselling, createProduct, deleteProduct, updateProduct } = require('../controller/product/productController');
const uploadImage = require('../utils/uploadImage');

router.get('/', getProducts);
router.get('/best-selling', getProductBesselling);
router.get('/sale', getProductSale);
router.get('/:id', getProductById);
router.post('/create-product', uploadImage('products').array('images', 10), createProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/update-product/:id', uploadImage('products').array('images', 10), updateProduct);
module.exports = router;