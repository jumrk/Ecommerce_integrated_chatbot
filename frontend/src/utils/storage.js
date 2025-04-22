const TOKEN_KEY = "authToken";

// Lưu token vào localStorage
export const setToken = (token) => {
    const expiryTime = Date.now() + 2 * 60 * 60 * 1000;
    const tokenData = {
        value: token,
        expiry: expiryTime,
    };
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokenData));
};

// Lấy token từ localStorage
export const getToken = () => {
    const data = localStorage.getItem(TOKEN_KEY);
    if (!data) return null;

    const { value, expiry } = JSON.parse(data);
    if (Date.now() > expiry) {
        // Token đã hết hạn, xóa khỏi localStorage
        localStorage.removeItem(TOKEN_KEY);
        return null;
    }
    return value;
};


// Xóa token khỏi localStorage (đăng xuất)
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Kiểm tra xem có token hay không
export const isAuthenticated = () => {
    return !!getToken(); // Trả về true nếu có token, false nếu không
};
