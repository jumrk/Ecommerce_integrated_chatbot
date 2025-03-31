const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct, deleteProduct, updateProduct } = require('../controller/product/productController');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/create-product', createProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/update-product/:id', updateProduct);
module.exports = router;