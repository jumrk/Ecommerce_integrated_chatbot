const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const getImageUrl = (imagePath) => {
    if (!imagePath) return '';

    if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
        return imagePath;
    }

    return `${BASE_URL}${imagePath}`;
};
