import React from 'react';

const PromoVideo = () => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 px-4 sm:px-6 lg:px-8 mb-6 md:mb-0">
                    <h2 className="text-2xl font-bold mb-4">Khám Phá Thế Giới Thời Trang Cùng Chúng Tôi</h2>
                    <p className="text-gray-700">
                        Chào mừng bạn đến với cửa hàng trực tuyến của chúng tôi! Tại đây, bạn sẽ tìm thấy những sản phẩm thời trang mới nhất và phong cách nhất.
                        Chúng tôi cam kết mang đến cho bạn trải nghiệm mua sắm tuyệt vời với chất lượng sản phẩm hàng đầu và dịch vụ khách hàng tận tâm.
                        Hãy cùng khám phá bộ sưu tập của chúng tôi và tìm kiếm những món đồ yêu thích cho phong cách của bạn!
                    </p>
                </div>
                <div className="md:w-1/2 px-4 sm:px-6 lg:px-8">
                    <video
                        className="w-full h-auto rounded-lg shadow-md object-contain"
                        controls
                        src="/videos/video1.mp4"
                        type="video/mp4"
                    >
                        Trình duyệt của bạn không hỗ trợ video.
                    </video>
                </div>
            </div>
        </section>
    );
};

export default PromoVideo;