import React from "react";
import CardProduct from "../../card/CardProduct";
import { ButtonOrange } from "../../button/Button";
import useShowMore from "../../../hooks/useShowMore";
import products from "../../../data/Product";
import { FadeInWhenVisible } from "../../animation/FadeInWhenVisible";
import { SlideInWhenVisible } from "../../animation/SlideInWhenVisible";
const BestSelling = () => {
    const { showMore, toggleShowMore, visibleItems } = useShowMore(products, 8);

    return (
        <section className="py-12 bg-gray-50 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" />
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70" />

            <div className="text-center mb-8">
                <FadeInWhenVisible delay={0.2}>
                    <div className="text-3xl md:text-4xl font-bold text-gray-800">
                        SẢN PHẨM BÁN CHẠY
                    </div>
                </FadeInWhenVisible>

                <SlideInWhenVisible direction='down' delay={0.2}>
                    <div className="text-gray-600 mt-2">
                        Khám phá những sản phẩm được yêu thích nhất của chúng tôi!
                    </div>
                </SlideInWhenVisible>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleItems.map((product) => (
                        <div key={product.id} className="h-full">
                            <CardProduct
                                {...product}
                            />
                        </div>
                    ))}
                </div>

                {showMore && (
                    <div className="text-center mt-8">
                        <div className="inline-block">
                            <ButtonOrange text={"Xem thêm"} onClick={toggleShowMore} />
                        </div>
                    </div>
                )}
            </div>
        </section >
    );
};

export default BestSelling;