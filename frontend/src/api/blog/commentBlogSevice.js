import api from '../axiosConfig'

// Function to create a new comment
export const createComment = async (blogId, content) => {
    try {
        const response = await api.post('/blog/comment/add-comment', { blogId, content });
        return response.data;
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error.response?.data || { message: "An error occurred while creating the comment. Please try again." };
    }
};

// Function to get comments by blog ID
export const getCommentsByBlog = async (blogId) => {
    try {
        const response = await api.get(`/blog/comment/get-comments/${blogId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error.response?.data || { message: "An error occurred while fetching comments. Please try again." };
    }
};

// Function to update a comment
export const updateComment = async (commentId, content) => {
    try {
        const response = await api.put(`/blog/comment/update-comment/${commentId}`, { content });
        return response.data;
    } catch (error) {
        console.error("Error updating comment:", error);
        throw error.response?.data || { message: "An error occurred while updating the comment. Please try again." };
    }
};

// Function to delete a comment
export const deleteComment = async (commentId) => {
    try {
        const response = await api.delete(`/comment/delete-comment/${commentId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error.response?.data || { message: "An error occurred while deleting the comment. Please try again." };
    }
};