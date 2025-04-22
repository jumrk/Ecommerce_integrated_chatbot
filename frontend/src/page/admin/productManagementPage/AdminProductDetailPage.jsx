import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/outline';
import Loading from '../../../component/loading/loading';
import Notification from '../../../component/notification/Notification';
import { getProductById } from '../../../api/product/productService';
import { getProductReviews } from '../../../api/product/productReview';
import { StarIcon } from '@heroicons/react/outline';
import { Helmet } from 'react-helmet';

const AdminProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(id);
                setProduct(productData);
                setMainImage(productData.images[0]);

                // Gọi hàm để lấy đánh giá sản phẩm
                const reviewsData = await getProductReviews(id);
                setReviews(reviewsData.reviews || []); // Giả sử reviews được trả về từ API
            } catch (error) {
                console.error("Error fetching product:", error);
                setNotification({
                    message: 'Không thể tải thông tin sản phẩm',
                    type: 'error'
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;
    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sản phẩm không tồn tại</h2>
                <p className="text-gray-600 mb-4">Có vẻ sản phẩm bạn tìm không có trong hệ thống.</p>
                <button onClick={() => navigate(-1)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300">
                    Quay lại
                </button>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <Helmet>
                <title>Chi tiết sản phẩm - {product.name}</title>
            </Helmet>
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
            >
                <ArrowLeftIcon className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
                <span>Quay lại</span>
            </button>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2">
                    <div className="p-2 md:p-4">
                        <div className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={import.meta.env.VITE_API_URL + mainImage}
                                alt="Main product"
                                className="w-full h-[300px] md:h-[500px] object-cover rounded-lg transform transition-transform duration-300"
                            />
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mt-2 md:mt-4">
                            {product.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className={`w-full rounded-md overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105 ${mainImage === image ? 'ring-2 ring-blue-500' : ''}`}
                                >
                                    <img src={import.meta.env.VITE_API_URL + image} alt={`Product view ${index + 1}`} className="rounded-md" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 flex flex-col gap-6">
                    <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                    <p className="text-lg text-gray-600">Giá: <span className="font-semibold text-red-600">{product.discount ? (product.price * (1 - product.discount / 100)).toLocaleString() : product.price.toLocaleString()}₫</span></p>
                    <p className="text-gray-600">Danh mục: <span className="font-semibold">{product.category?.name}</span></p>
                    <p className="text-gray-600">Mô tả: {product.description}</p>
                    <p className="text-gray-600">Trạng thái: <span className="font-semibold">{product.status}</span></p>
                    <p className="text-gray-600">Đã bán: <span className="font-semibold">{product.sold}</span></p>
                    <h3 className="text-lg font-semibold">Thông số kỹ thuật</h3>
                    <ul className="list-disc pl-5">
                        {Object.entries(product.specifications).map(([key, value]) => (
                            <li key={key} className="text-gray-600">{key}: <span className="font-semibold">{value}</span></li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-semibold">Màu sắc</h3>
                    <ul className="list-disc pl-5">
                        {product.colors.map(color => (
                            <li key={color._id} className="text-gray-600">{color.name}</li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-semibold">Kích thước</h3>
                    <ul className="list-disc pl-5">
                        {product.sizes.map(size => (
                            <li key={size} className="text-gray-600">{size}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Đánh giá của khách hàng</h2>
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review._id} className="border-b pb-4 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{review.userId.fullName}</span>
                                <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex text-yellow-400 mt-1">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`h-4 w-4 ${index < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                    />
                                ))}
                            </div>
                            <p className="text-gray-600 mt-2">{review.comment}</p>
                            {review.images.length > 0 && (
                                <div className="mt-2 flex gap-2">
                                    {review.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={import.meta.env.VITE_API_URL + img}
                                            alt={`Review image ${index + 1}`}
                                            className="w-20 h-20 object-cover rounded-lg shadow-md"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Chưa có đánh giá nào cho sản phẩm này.</p>
                )}
            </div>
        </div>
    );
};

export default AdminProductDetailPage; 