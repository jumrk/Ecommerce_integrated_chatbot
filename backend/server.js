const express = require('express');
const http = require('http');
const { initSocket } = require('./config/socket');
const session = require("express-session");
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const indexRouter = require('./routers/indexRouter');
const passport = require("./config/passport")
dotenv.config();
const app = express();
const server = http.createServer(app);
const path = require('path');
// Kết nối database
connectDB();

// Khởi tạo Socket.IO
initSocket(server);

// Cấu hình express-session
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }, // Đặt thành true nếu dùng HTTPS
    })
);

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Đường dẫn đến thư mục chứa views

// Cấu hình Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// Routes
indexRouter(app);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});