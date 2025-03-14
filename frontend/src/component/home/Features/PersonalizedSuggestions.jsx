import React, { useState } from 'react';
import CardProduct from '../../card/CardProduct';
import { ButtonBlue } from '../../button/Button';
import products from "../../../data/Product";
import { SlideInWhenVisible } from '../../animation/SlideInWhenVisible';
import { FadeInWhenVisible } from '../../animation/FadeInWhenVisible';
const PersonalizedSuggestions = ({ isLoggedIn = false }) => {

    return (
        <section className="py-12 bg-white">
            <SlideInWhenVisible direction="down" delay={0.2}>
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">GỢI Ý THEO SỞ THÍCH</h2>
                    <p className="text-gray-600 mt-2">
                        {isLoggedIn ? 'Dựa trên sở thích và lịch sử của bạn!' : 'Đăng nhập để nhận gợi ý cá nhân hóa!'}
                    </p>
                </div>
            </SlideInWhenVisible>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isLoggedIn ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <CardProduct
                                key={product.id}
                                {...product}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <FadeInWhenVisible delay={0.3}>
                            <p className="text-lg text-gray-700 mb-4">Bạn chưa đăng nhập để nhận gợi ý cá nhân hóa.</p>
                        </FadeInWhenVisible>

                        <SlideInWhenVisible direction="down" delay={0.2}>
                            <ButtonBlue text="Đăng nhập ngay" />
                        </SlideInWhenVisible>

                    </div>
                )}
            </div>
        </section>
    );
};

export default PersonalizedSuggestions;