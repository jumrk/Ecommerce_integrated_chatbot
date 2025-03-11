export const getSuggestedProducts = (currentProduct, allProducts, limit = 4) => {
    if (!currentProduct || !allProducts) return [];

    // Lọc sản phẩm cùng danh mục, loại trừ sản phẩm hiện tại
    const similarProducts = allProducts.filter(product =>
        product.categoryId === currentProduct.categoryId &&
        product.id !== currentProduct.id
    );

    // Sắp xếp theo rating và số lượng đánh giá
    const sortedProducts = similarProducts.sort((a, b) => {
        if (b.rating === a.rating) {
            return b.reviews - a.reviews;
        }
        return b.rating - a.rating;
    });

    // Trả về số lượng sản phẩm theo limit
    return sortedProducts.slice(0, limit);
};