const TOKEN_KEY = "authToken";

// Lưu token vào localStorage
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Lấy token từ localStorage
export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

// Xóa token khỏi localStorage (đăng xuất)
export const removeToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Kiểm tra xem có token hay không
export const isAuthenticated = () => {
    return !!getToken(); // Trả về true nếu có token, false nếu không
};
