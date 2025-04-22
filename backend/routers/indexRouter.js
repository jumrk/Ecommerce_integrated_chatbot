const productRouter = require('./productRouter');
const reviewProductRouter = require('./reviewProductRouter');
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const vnPayRouter = require('./vnpayRouter')
const blogRouter = require('./blogRouter');
const voucherRouter = require('./voucherRouter');
const shipperRouter = require('./shipperRouter');
const shippingConfigRoutes = require('./shippingRouter');
const addressRouter = require('./addressRouter');
const messageRoutes = require('./messageRoutes');
const favoriteRouter = require('./favoriteRouter');
const chatbotRouter = require('./chatbotRouter')
const dashboardRouter = require('./dashboard');
function indexRouter(app) {
    app.use('/api/products', productRouter);
    app.use('/api/reviews', reviewProductRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/vnpay', vnPayRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/vouchers', voucherRouter);
    app.use('/api/shippers', shipperRouter);
    app.use('/api/shipping-config', shippingConfigRoutes);
    app.use('/api/address', addressRouter)
    app.use('/api/messages', messageRoutes);
    app.use('/api/favorites', favoriteRouter);
    app.use('/api/chatbot', chatbotRouter);
    app.use('/api/dashboard', dashboardRouter);
}

module.exports = indexRouter;
