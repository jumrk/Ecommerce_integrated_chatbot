const User = require('../../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { resetPasswordEmailTemplate } = require('../../utils/emailTemplate');
require('dotenv').config();
const register = async (req, res) => {
    try {
        const { fullName, email, password, phone, confirmPassword } = req.body;
        if (!fullName || !email || !password || !phone || !confirmPassword) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập đầy đủ thông tin" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Email không hợp lệ" });
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ success: false, message: "Số điện thoại không hợp lệ" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Mật khẩu không khớp" });
        }

        const checkEmail = await User.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({ success: false, message: "Email đã tồn tại" });
        }

        const checkPhone = await User.findOne({ phone });
        if (checkPhone) {
            return res.status(400).json({ success: false, message: "Số điện thoại đã tồn tại" });
        }


        const user = new User({ fullName, email, password, phone });

        const createdUser = await user.save();
        if (!createdUser) {
            return res.status(400).json({ success: false, message: "Đăng ký tài khoản thất bại" });
        }

        res.status(201).json({ success: true, message: "Đăng ký tài khoản thành công" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ", error: error.message });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Vui lòng nhập email và mật khẩu" });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Email không hợp lệ" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Tài khoản không tồn tại" });
        }

        if (!user.isActive) {
            return res.status(403).json({ success: false, message: "Tài khoản của bạn đã bị khóa" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Mật khẩu không chính xác" });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Mật khẩu phải có ít nhất 8 ký tự" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.status(200).json({
            success: true,
            message: "Đăng nhập thành công",
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ", error: error.message });
    }
};

const checkPassword = async (req, res) => {
    const { password } = req.body;
    const userId = req.user.userId;

    try {
        // Kiểm tra password có được gửi không
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng cung cấp mật khẩu"
            });
        }

        const checkUser = await User.findById(userId);
        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "Người dùng không tồn tại"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Mật khẩu không chính xác"
            });
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error("Lỗi kiểm tra mật khẩu:", error); // Log lỗi cho server
        return res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi server"
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email không tồn tại' });
        }

        // Generate a random password
        const randomPassword = Math.random().toString(36).slice(-8);
        user.password = randomPassword;
        await user.save();

        // Send the random password to the user's email
        const resetLink = `${process.env.FRONTEND_URL}/login`;
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "🔑 Khôi phục mật khẩu - [Tên Website của bạn]",
            html: resetPasswordEmailTemplate({ userName: user.fullName, randomPassword, resetLink }),
        };


        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: 'Mật khẩu mới đã được gửi đến email của bạn',
            resetLink
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi máy chủ", error: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const userId = req.user.userId;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng cung cấp mật khẩu mới'
            });
        }

        // Tìm user theo ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Người dùng không tồn tại'
            });
        }

        user.password = password;
        await user.save(); // Kích hoạt pre('save') để hash password

        // Trả về kết quả thành công
        return res.status(200).json({
            success: true,
            message: 'Mật khẩu đã được đặt lại thành công'
        });

    } catch (error) {
        console.error("Lỗi khi đặt lại mật khẩu:", error);
        return res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi server'
        });
    }
};

const googleAuthCallback = (req, res) => {
    const token = jwt.sign(
        { userId: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
};

const facebookAuthCallback = (req, res) => {
    const token = jwt.sign(
        { userId: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
    );
    res.redirect(`${process.env.FRONTEND_URL}/auth-success?token=${token}`);
};

module.exports = { register, login, checkPassword, forgotPassword, resetPassword, googleAuthCallback, facebookAuthCallback };
