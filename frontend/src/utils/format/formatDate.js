export const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    };

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options).replace(',', '');
    } catch (error) {
        return dateString;
    }
};

// Thêm các hàm format khác nếu cần
export const formatShortDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };

    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', options);
    } catch (error) {
        return dateString;
    }
};

export const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
        return formatShortDate(dateString);
    }
    if (days > 0) {
        return `${days} ngày trước`;
    }
    if (hours > 0) {
        return `${hours} giờ trước`;
    }
    if (minutes > 0) {
        return `${minutes} phút trước`;
    }
    return 'Vừa xong';
};