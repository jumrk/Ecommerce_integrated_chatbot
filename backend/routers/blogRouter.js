const express = require("express");
const Router = express.Router();
const { addCategory, deleteCategory, getCategories, updateCategory } = require('../controller/blog/blogCategoryController');
const uploadImage = require("../utils/uploadImage");
const { createComment, deleteComment, getCommentsByBlog, updateComment } = require('../controller/blog/blogCommentController')
const { addBlog, getBlogsUser, getBlogById, getBlogs, deleteBlog, updateBlog, browse_Article, getApprovedBlogs, rejectArticle } = require('../controller/blog/blogController')
const { checkBlogLike, createBlogLike, getBlogLikesCount } = require('../controller/blog/blogLikeController');
const { verifyToken } = require("../middleware/auth");

// Category
Router.get('/category/get-list', getCategories)
Router.post('/category/add-category', addCategory)
Router.put('/category/update-category/:id', updateCategory)
Router.delete('/category/delete-category/:id', deleteCategory)

// blog
Router.get('/get-list', getBlogs);
Router.get('/get-list-by-user', verifyToken, getBlogsUser)
Router.get('/get-blog/:id', getBlogById);
Router.get('/get-approved-blogs', getApprovedBlogs);
Router.post('/add-blog', verifyToken, uploadImage("blog").array('images', 10), addBlog);
Router.put('/update-blog/:id', uploadImage("blog").array('images', 10), updateBlog);
Router.delete('/delete-blog/:id', deleteBlog);
Router.put('/browse-article/:id', browse_Article);
Router.put('/reject-article/:id', rejectArticle);

// comment
Router.post('/comment/add-comment', verifyToken, createComment);
Router.get('/comment/get-comments/:id', getCommentsByBlog);
Router.put('/comment/update-comment/:id', updateComment);
Router.delete('/comment/delete-comment/:id', deleteComment);

// like
Router.get('/like/check-like/:id', verifyToken, checkBlogLike);
Router.post('/like/create-like/:id', verifyToken, createBlogLike);
Router.get('/like/get-like-count/:id', getBlogLikesCount);
module.exports = Router