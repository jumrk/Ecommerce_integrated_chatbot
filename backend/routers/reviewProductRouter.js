
const express = require('express');
const reviewController = require('../controller/product/reviewProductController');
const uploadImage = require('../utils/uploadImage');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const uploadReviewImages = uploadImage('reviews').array('images', 5);

router.post('/products/:productId', verifyToken, uploadReviewImages, reviewController.createReview);
router.get('/products/:productId', reviewController.getReviewsByProductId);
router.get('/', reviewController.getAllReview)

module.exports = router;
