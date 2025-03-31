
const resetPasswordEmailTemplate = ({ userName, randomPassword, resetLink }) => `
    <div style="max-width: 600px; margin: 0 auto; padding: 30px; font-family: 'Helvetica Neue', Arial, sans-serif; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); line-height: 1.6;">
        <!-- Header -->
        <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #1a73e8; font-size: 24px; margin: 0;">🔑 Đặt lại mật khẩu</h2>
            <p style="color: #666; font-size: 16px; margin: 10px 0;">JUMRK</p>
        </div>

        <!-- Content -->
        <div style="background: #f8fafc; padding: 25px; border-radius: 8px; text-align: center;">
            <p style="color: #444; font-size: 16px; margin: 0 0 15px;">Xin chào <strong>${userName || "bạn"}</strong>,</p>
            <p style="color: #444; font-size: 16px; margin: 0 0 20px;">Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn. Dưới đây là mật khẩu mới:</p>
            <div style="background: #e8f0fe; padding: 15px 20px; border-radius: 6px; display: inline-block; margin: 15px 0;">
                <span style="font-size: 22px; font-weight: 600; color: #1a73e8; letter-spacing: 2px;">${randomPassword}</span>
            </div>
            <p style="color: #444; font-size: 14px; margin: 0 0 25px;">Vui lòng sử dụng mật khẩu này để đăng nhập và đổi mật khẩu mới ngay lập tức để bảo mật tài khoản.</p>
            <a href="${resetLink}" style="display: inline-block; padding: 12px 30px; background: #1a73e8; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500; transition: background 0.3s;">
                Đăng nhập ngay
            </a>
        </div>

        <!-- Warning -->
        <p style="color: #888; font-size: 13px; text-align: center; margin: 20px 0 0;">Nếu bạn không gửi yêu cầu này, vui lòng bỏ qua email hoặc liên hệ hỗ trợ ngay.</p>

        <!-- Footer -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 30px;">
            <p style="color: #999; font-size: 12px; margin: 0;">© 2024 JUMRK. All Rights Reserved.</p>
            <p style="color: #bbb; font-size: 11px; margin: 5px 0;">Email này được gửi tự động, vui lòng không trả lời trực tiếp.</p>
        </div>
    </div>
`;

module.exports = { resetPasswordEmailTemplate };