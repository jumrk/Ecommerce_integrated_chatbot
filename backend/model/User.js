const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, "Email không hợp lệ"]
        },
        phone: {
            type: String,
            unique: true,
            trim: true,
            sparse: true,
            match: [/^\d{10,11}$/, "Số điện thoại không hợp lệ"]
        },
        birthday: { type: Date, default: null },
        gender: { type: String, enum: ["male", "female", "other"], default: "other" },
        password: {
            type: String,
            minlength: 6,
            required: function () { return !this.googleId && !this.facebookId; }
        },
        avatar: { type: String },
        role: { type: String, enum: ["customer", "admin"], default: "customer" },
        isActive: { type: Boolean, default: true },
        googleId: { type: String, unique: true, sparse: true },
        facebookId: { type: String, unique: true, sparse: true },
        resetPasswordToken: { type: String, default: null },
        resetPasswordExpires: { type: Date, default: null }
    },
    { timestamps: true }
);

// 🔹 Hash mật khẩu trước khi lưu
userSchema.pre("save", async function (next) {
    if (!this.isModified("password") || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// 🔹 Kiểm tra mật khẩu
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// 🔹 Tạo token reset mật khẩu
userSchema.methods.generateResetToken = function () {
    const token = crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = token;
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    return token;
};

// 🔹 Ẩn mật khẩu khi trả về API
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.resetPasswordToken;
    delete user.resetPasswordExpires;
    return user;
};

module.exports = mongoose.model("User", userSchema);
