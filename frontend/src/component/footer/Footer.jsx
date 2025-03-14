import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { ButtonOrange } from '../button/Button';
import { Link } from 'react-router-dom'
function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <img
                            src="/images/Logo.png"
                            alt="Logo"
                            className="h-28 w-auto object-cover bg-transparent"
                        />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Chúng tôi mang đến những sản phẩm thời trang chất lượng cao, theo xu hướng mới nhất để tôn lên phong cách của bạn.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="https://www.facebook.com/jumrk03" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaFacebook size={24} />
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaTwitter size={24} />
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaInstagram size={24} />
                            </Link>
                            <Link to="#" className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110">
                                <FaLinkedin size={24} />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Liên kết nhanh</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="text-gray-400 hover:text-white transition-all duration-300 hover:pl-2">
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link to="/directory/all-products" className="text-gray-400 hover:text-white transition-all duration-300 hover:pl-2">
                                    Sản phẩm
                                </Link>
                            </li>
                            <li>
                                <Link to="/directory/about-us" className="text-gray-400 hover:text-white transition-all duration-300 hover:pl-2">
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link to="/directory/contact" className="text-gray-400 hover:text-white transition-all duration-300 hover:pl-2">
                                    Liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Phần 3: Thông tin liên hệ */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Liên hệ</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center space-x-2">
                                <FaMapMarkerAlt />
                                <span>109 Đường Phạm như xương, TP.Đà nẵng</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaPhone />
                                <span>+84 373 532 273</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <FaEnvelope />
                                <span>Jumrk03@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Phần 4: Đăng ký nhận tin */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 uppercase tracking-wider">Đăng ký nhận tin</h3>
                        <p className="text-gray-300 text-sm mb-4">
                            Nhận thông tin mới nhất về sản phẩm và ưu đãi!
                        </p>
                        <div className="flex flex-col space-y-4">
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
                            />
                            <ButtonOrange text="Đăng ký" />
                        </div>
                    </div>
                </div>

                {/* Dòng phân cách */}
                <div className="border-t border-gray-800 mt-8 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                        <p>&copy; 2025 Thời Trang. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white transition-all duration-300">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="hover:text-white transition-all duration-300">
                                Điều khoản dịch vụ
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer