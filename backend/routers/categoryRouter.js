const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controller/product/categoryController');

router.get('/', getCategories);
router.post('/create-category', createCategory);
router.put('/update-category/:id', updateCategory);
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;
