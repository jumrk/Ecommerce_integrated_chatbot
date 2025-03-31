const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const userRouter = require('./userRouter');
const authRouter = require('./authRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const vnPayRouter = require('./vnpayRouter')
const paymentMethodRouter = require('./paymentMethodRouter');
const blogRouter = require('./blogRouter');
const voucherRouter = require('./voucherRouter');
const shipperRouter = require('./shipperRouter');
const sippingRouter = require('./shippingRouter');
const addressRouter = require('./addressRouter');
function indexRouter(app) {
    app.use('/api/products', productRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/users', userRouter);
    app.use('/api/auth', authRouter);
    app.use('/api/cart', cartRouter);
    app.use('/api/order', orderRouter);
    app.use('/api/vnpay', vnPayRouter);
    app.use('/api/payment-method', paymentMethodRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/vouchers', voucherRouter);
    app.use('/api/shippers', shipperRouter);
    app.use('/api/shippings', sippingRouter);
    app.use('/api/address', addressRouter)
}

module.exports = indexRouter;
