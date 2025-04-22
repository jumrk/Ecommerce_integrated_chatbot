const express = require('express');
const router = express.Router();
const uploadImage = require("../utils/uploadImage");
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controller/product/categoryController');

router.get('/', getCategories);
router.post('/create-category', uploadImage('category').single('category'), createCategory);
router.put('/update-category/:id', uploadImage('category').single('category'), updateCategory);
router.delete('/delete-category/:id', deleteCategory);

module.exports = router;
