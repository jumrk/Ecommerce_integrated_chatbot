const Favorite = require('../../model/Favorite');

exports.checkFavorite = async (req, res) => {
    const { productId } = req.params;
    const userId = req.user.userId;
    try {
        const favorite = await Favorite.findOne({ userId, productId });
        res.json({ isFavorite: !!favorite });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.getFavoritesByIdUser = async (req, res) => {
    const userId = req.user.userId;
    try {
        const favorite = await Favorite.find({ userId }).populate('productId')
        res.json({ success: true, favorite })
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
}

exports.addFavorite = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId;
    try {
        const favorite = new Favorite({ userId, productId });
        await favorite.save();
        res.status(201).json({ message: 'Đã thêm vào yêu thích' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Sản phẩm đã được yêu thích' });
        }
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.userId;
    try {
        const result = await Favorite.findOneAndDelete({ userId, productId });
        if (!result) {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm yêu thích' });
        }
        res.json({ message: 'Đã hủy yêu thích' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
};