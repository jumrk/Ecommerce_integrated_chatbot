import React, { useState, useEffect } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { NavLink } from "react-router-dom";
import { getToken } from '../../utils/storage';
import { getCategories } from '../../api/category/categoryProduct';
import { getCountCart } from '../../api/cart/cartSevice';
import { useCart } from '../../context/cartContext';
import { getProducts } from '../../api/product/productService';

const Header = () => {
  const { cartCount, setCartCount } = useCart();
  const token = getToken();
  const [state, setState] = useState({
    mobileMenu: false,
    searchOpen: false,
  });
  const [isAuthenticated] = useState(!!token);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const fetchCount = async () => {
    try {
      const cartCount = await getCountCart();
      setCartCount(cartCount);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setAllProducts(products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCount();
    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (state.mobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [state.mobileMenu]);

  const toggleMobileMenu = () => setState((prev) => ({
    ...prev,
    mobileMenu: !prev.mobileMenu,
    searchOpen: false,
  }));

  const toggleSearch = () => {
    setState((prev) => ({
      ...prev,
      searchOpen: !prev.searchOpen,
      mobileMenu: false,
    }));
    setSearchTerm('');
    setFilteredProducts([]);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === '') {
      setFilteredProducts([]);
      return;
    }
    const filtered = allProducts.filter(product =>
      product.name?.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const navItems = [
    {
      name: 'Sản phẩm',
      link: '/directory/all-products',
      dropdown: categories
        .filter(cat => cat.status)
        .map((cat) => ({
          name: cat.name,
          link: `/directory/all-products/${cat.name}`,
        }))
      ,
    },
    { name: 'Đang giảm giá', link: '/directory/discounted-products' },
    { name: 'Blog', link: '/directory/fashion-blog' },
    { name: 'Về chúng tôi', link: '/directory/about-us' },
    { name: 'Liên hệ', link: '/directory/contact' },
  ];

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink to="/">
            <img
              src="/images/Logo.png"
              alt="Logo"
              className="h-28 w-auto object-cover bg-transparent"
            />
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navItems.map((item, index) => (
                <li key={index} className="relative group">
                  <NavLink
                    to={item.link}
                    className="flex items-center text-gray-700 hover:text-black transition-all duration-300 ease-in-out 
                              relative after:content-[''] after:absolute after:left-0 after:bottom-[-4px] 
                              after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 
                              hover:after:w-full"
                  >
                    {item.name}
                    {item.dropdown && (
                      <FaChevronDown
                        className={`ml-1 transition-transform duration-300 ease-in-out ${state.mobileMenu ? 'rotate-180' : 'rotate-0'}`}
                      />
                    )}
                  </NavLink>
                  {item.dropdown && (
                    <div
                      className="absolute left-0 top-10 w-48 bg-white shadow-2xl z-[60] 
                                opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                transition-all duration-300 ease-in-out transform group-hover:-translate-y-1"
                    >
                      {item.dropdown.map((subItem, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={subItem.link}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 
                                    transition-all duration-200 ease-in-out hover:text-black"
                        >
                          {subItem.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex space-x-6">
              <button onClick={toggleSearch} className="text-gray-700 hover:text-black transition-all duration-300 ease-in-out hover:scale-110">
                <FaSearch size={20} />
              </button>
              <button className="text-gray-700 hover:text-black transition-all duration-300 ease-in-out hover:scale-110 relative">
                <NavLink to="/cart">
                  <FaShoppingCart size={20} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </button>
              <div className="relative group">
                <div className="cursor-pointer">
                  <FaUser
                    size={20}
                    className="text-gray-700 transition-all duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                  {!isAuthenticated ? (
                    <>
                      <NavLink
                        to="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300"
                      >
                        Đăng nhập
                      </NavLink>
                      <NavLink
                        to="/register"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300"
                      >
                        Đăng ký
                      </NavLink>
                    </>
                  ) : (
                    <NavLink
                      to="/user"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300"
                    >
                      Thông tin
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleSearch} className="text-gray-700 hover:text-black transition-all duration-300 ease-in-out hover:scale-110">
              <FaSearch size={20} />
            </button>
            <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-black relative w-6 h-6">
              <FaBars
                size={24}
                className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${state.mobileMenu ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
              />
              <FaTimes
                size={24}
                className={`absolute top-0 left-0 transition-all duration-300 ease-in-out ${state.mobileMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
              />
            </button>
          </div>
        </div>

        {/* Search Container */}
        <div
          className={`absolute top-16 left-0 w-full bg-white shadow-lg z-40 px-4 py-4 transition-all duration-300 ease-in-out ${state.searchOpen ? 'max-h-[80vh] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2 overflow-hidden'
            }`}
        >
          <div className="max-w-7xl mx-auto flex items-center space-x-2 relative">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-0 transition-all duration-300 ease-in-out text-sm sm:text-base"
                value={searchTerm}
                onChange={handleSearch}
              />
              {searchTerm && filteredProducts.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl max-h-[60vh] overflow-y-auto mt-2 rounded-lg z-50">
                  {filteredProducts.map((product) => (
                    <li
                      key={product._id}
                      className="flex items-center px-3 py-2 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 sm:px-4 sm:py-3"
                    >
                      <NavLink
                        to={`/directory/product-detail/${product._id}`}
                        onClick={toggleSearch}
                        className="flex items-center w-full space-x-3"
                      >
                        <img
                          src={import.meta.env.VITE_API_URL + product.images?.[0] || '/images/placeholder.jpg'}
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md sm:w-12 sm:h-12"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-800 truncate sm:text-base">{product.name}</h3>
                          <p className="text-xs text-red-600 font-semibold sm:text-sm">{formatPrice(product.price)}</p>
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
              {/* Thông báo khi không tìm thấy */}
              {searchTerm && filteredProducts.length === 0 && (
                <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl px-3 py-2 mt-2 rounded-lg z-50 text-gray-600 text-sm sm:px-4 sm:py-3 sm:text-base">
                  Không tìm thấy sản phẩm nào.
                </div>
              )}
            </div>
            <button onClick={toggleSearch} className="text-gray-700 hover:text-black transition-all duration-300 ease-in-out hover:scale-110">
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out transform ${state.mobileMenu ? 'max-h-[500px] opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
            }`}
        >
          <ul className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.link}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out hover:text-black hover:pl-5"
                  onClick={toggleMobileMenu}
                >
                  {item.name}
                </NavLink>
                {item.dropdown &&
                  item.dropdown.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.link}
                      className="block px-6 py-2 text-gray-600 hover:bg-gray-100 transition-all duration-200 ease-in-out hover:text-black hover:pl-8"
                      onClick={toggleMobileMenu}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
              </li>
            ))}
            <div className="flex justify-around py-2 border-t">
              <button
                onClick={toggleSearch}
                className="text-gray-700 transition-all duration-300 ease-in-out hover:scale-110"
              >
                <FaSearch size={20} />
              </button>
              <NavLink
                to="/cart"
                onClick={toggleMobileMenu}
                className="relative"
              >
                <div className="relative">
                  <FaShoppingCart
                    size={20}
                    className="text-gray-700 transition-all duration-300 ease-in-out hover:scale-110"
                  />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
              </NavLink>
              <div className="relative group">
                <div className="cursor-pointer">
                  <NavLink to="/user">
                    <FaUser
                      size={20}
                      className="text-gray-700 transition-all duration-300 ease-in-out hover:scale-110"
                    />
                  </NavLink>
                </div>
                {!isAuthenticated && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 z-50">
                    <NavLink
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300"
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-300"
                    >
                      Đăng ký
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;