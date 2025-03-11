import React from "react";
import CardProduct from "../../card/CardProduct";
import { ButtonOrange } from "../../button/Button";
import useShowMore from "../../../hooks/useShowMore";
import products from "../../../data/Product";
const BestSelling = () => {

    const { showMore, toggleShowMore, visibleItems } = useShowMore(products, 8)

    return (
        <section className="py-12 bg-gray-50">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">SẢN PHẨM BÁN CHẠY</h2>
                <p className="text-gray-600 mt-2">Khám phá những sản phẩm được yêu thích nhất của chúng tôi!</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {visibleItems.map((product) => (
                        <CardProduct key={product.id} {...product} />
                    ))}
                </div>

                {showMore && (
                    <div className="text-center mt-8">
                        <ButtonOrange text={"Xem thêm"} onClick={toggleShowMore} />
                    </div>
                )}
            </div>
        </section>
    );
};

export default BestSelling;
