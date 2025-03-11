import React, { useState } from 'react';
import CardProduct from '../../card/CardProduct';
import { ButtonBlue } from '../../button/Button';
import products from "../../../data/Product";
const PersonalizedSuggestions = ({ isLoggedIn = false }) => {

    return (
        <section className="py-12 bg-white">
            <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">GỢI Ý THEO SỞ THÍCH</h2>
                <p className="text-gray-600 mt-2">
                    {isLoggedIn ? 'Dựa trên sở thích và lịch sử của bạn!' : 'Đăng nhập để nhận gợi ý cá nhân hóa!'}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {isLoggedIn ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <CardProduct
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                discount={product.discount}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-100 rounded-lg">
                        <p className="text-lg text-gray-700 mb-4">Bạn chưa đăng nhập để nhận gợi ý cá nhân hóa.</p>
                        <ButtonBlue text="Đăng nhập ngay" />
                    </div>
                )}
            </div>
        </section>
    );
};

export default PersonalizedSuggestions;