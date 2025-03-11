import { Routes, Route } from 'react-router-dom'
import HomePage from './page/homePage/HomePage'
import MainLayout from './layout/mainLayout'
import AllProductsPage from './page/allProductPage/AllProductsPage'
import DiscountedProductsPage from './page/discountedProductPage/DiscountedProductsPage'
import FashionBlogPage from './page/blogPage/FashionBlogPage'
import BlogPostDetail from './page/blogPage/BlogPostDetail'
import CreateBlogPost from './page/blogPage/CreateBlogPost'
import AboutUsPage from './page/aboutUsPage/AboutUsPage'
import ContactPage from './page/contactPage/ContactPage'
import ScrollToTop from './hooks/scrollToTop'
import ProductDetailPage from './page/productDetailPage/ProductDetailPage'
import CartPage from './page/cartPage/CartPage'
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          {/* router home */}
          <Route path='/' element={<HomePage />} />
          {/* router product */}
          <Route path='/directory/all-products' element={<AllProductsPage />} />
          <Route path='/directory/all-products/:categoryParam?' element={<AllProductsPage />} />
          {/* Router product sale */}
          <Route path='/directory/discounted-products' element={<DiscountedProductsPage />} />
          {/* Product detail */}
          <Route path='/directory/product-detail/:id' element={<ProductDetailPage />} />
          {/* Router blog */}
          <Route path='/directory/fashion-blog' element={<FashionBlogPage />} />
          <Route path='/directory/fashion-blog/:id' element={<BlogPostDetail />} />
          <Route path="/directory/fashion-blog/create" element={<CreateBlogPost />} />
          {/* Router about us */}
          <Route path="/directory/about-us" element={<AboutUsPage />} />
          {/* Router contact */}
          <Route path="/directory/contact" element={<ContactPage />} />
          {/* Router cart */}
          <Route path="/cart" element={<CartPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
