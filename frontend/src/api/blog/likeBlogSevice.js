import api from '../axiosConfig'

export const likeBlog = async (blogId) => {
    try {
        const response = await api.post(`/blog/like/create-like/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error liking the blog:", error);
        throw error.response?.data || { message: "An error occurred while liking the blog. Please try again." };
    }
};

export const checkBlogLike = async (blogId) => {
    try {
        const response = await api.get(`/blog/like/check-like/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error checking blog like status:", error);
        throw error.response?.data || { message: "An error occurred while checking like status. Please try again." };
    }
};

export const getBlogLikesCount = async (blogId) => {
    try {
        const response = await api.get(`/blog/like/get-like-count/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog like count:", error);
        throw error.response?.data || { message: "An error occurred while fetching like count. Please try again." };
    }
};