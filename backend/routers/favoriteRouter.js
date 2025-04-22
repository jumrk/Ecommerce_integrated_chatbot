const express = require('express');
const router = express.Router();
const favoriteController = require('../controller/favorite/FavoriteController');
const { verifyToken } = require('../middleware/auth');
router.get('/check/:productId', verifyToken, favoriteController.checkFavorite);

// Thêm sản phẩm vào yêu thích
router.post('/', verifyToken, favoriteController.addFavorite);
// get sản phẩm yên thích của user
router.get('/get-for-user', verifyToken,favoriteController.getFavoritesByIdUser)
// Hủy yêu thích
router.delete('/', verifyToken, favoriteController.removeFavorite);

module.exports = router;