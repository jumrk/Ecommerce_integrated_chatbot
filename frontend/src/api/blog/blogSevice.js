import api from '../axiosConfig'

// Function to simulate a delay (optional)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Get all blogs
export const getBlogs = async () => {
    try {
        await delay(2000);
        const response = await api.get('/blog/get-list');
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error.response?.data || { message: "An error occurred while fetching blogs. Please try again." };
    }
};
// get a blog by user
export const getBlogsForUser = async () => {
    try {
        await delay(2000);
        const response = await api.get('/blog/get-list-by-user');
        return response.data;
    } catch (error) {
        console.error("Error fetching blogs:", error);
        throw error.response?.data || { message: "An error occurred while fetching blogs. Please try again." };
    }
};
// Get a blog by ID
export const getBlogById = async (id) => {
    try {
        await delay(2000);
        const response = await api.get(`/blog/get-blog/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching blog:", error);
        throw error.response?.data || { message: "An error occurred while fetching the blog. Please try again." };
    }
};

export const getApprovedBlogs = async () => {
    try {
        await delay(2000)
        const response = await api.get('/blog/get-approved-blogs'); // Adjust the endpoint as necessary
        return response.data;
    } catch (error) {
        console.error("Error fetching approved blogs:", error);
        throw error.response?.data || { message: "An error occurred while fetching approved blogs. Please try again." };
    }
};

// Add a new blog
export const addBlog = async (data) => {
    try {
        await delay(2000);
        const response = await api.post('/blog/add-blog', data);
        return response.data;
    } catch (error) {
        console.error("Error adding blog:", error);
        throw error.response?.data || { message: "An error occurred while adding the blog. Please try again." };
    }
};

// Update an existing blog
export const updateBlog = async (id, data) => {
    try {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        formData.append('category', data.category);
        formData.append('author', data.author);
        data.images.forEach(image => {
            formData.append('images', image);
        });

        const response = await api.put(`/blog/update-blog/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        throw error.response?.data || { message: "An error occurred while updating the blog. Please try again." };
    }
};

// Delete a blog
export const deleteBlog = async (id) => {
    try {
        await delay(2000);
        const response = await api.delete(`/blog/delete-blog/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting blog:", error);
        throw error.response?.data || { message: "An error occurred while deleting the blog. Please try again." };
    }
};

// Approve a blog
export const browse_Article = async (id) => {
    try {
        await delay(2000);
        const response = await api.put(`/blog/browse-article/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error approving blog:", error);
        throw error.response?.data || { message: "An error occurred while approving the blog. Please try again." };
    }
};

// Reject a blog
export const rejectArticle = async (id) => {
    try {
        await delay(2000);
        const response = await api.put(`/blog/reject-article/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error rejecting blog:", error);
        throw error.response?.data || { message: "An error occurred while rejecting the blog. Please try again." };
    }
};