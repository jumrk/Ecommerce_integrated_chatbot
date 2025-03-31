export const validateField = (field, value, formData) => {
    switch (field) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value) ? '' : 'Email không hợp lệ';
        case 'phone':
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(value) ? '' : 'Số điện thoại không hợp lệ (10 chữ số)';

        case 'password':
            return value.length >= 8 ? '' : 'Mật khẩu phải có ít nhất 8 ký tự';

        case 'confirmPassword':
            return value === formData.password ? '' : 'Mật khẩu xác nhận không khớp';

        default:
            return '';
    }
};