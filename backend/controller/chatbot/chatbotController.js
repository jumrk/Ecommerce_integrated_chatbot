const Product = require('../../model/Product');
const { support, searchBlogs, searchProducts, analyzeMessageWithAI } = require('../../services/aiService');
const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        const intent = await analyzeMessageWithAI(message);
        let response;
        let blogs = [];
        console.log(intent.trim())
        switch (intent.trim()) {
            case 'search_product':
                const products = await searchProducts(message);
                if (products.products.length > 0) {
                    const productDetails = products.products.map(product => {
                        return {
                            name: product.name,
                            price: product.price,
                            id: product._id,
                            images: product.images[0]
                        };
                    });
                    response = {
                        success: true,
                        products: productDetails,
                        summary: products.summary
                    };
                    res.json(response);
                } else {
                    response = {
                        success: false,
                        message: 'Rất tiếc, tôi không tìm thấy sản phẩm nào phù hợp với yêu cầu của bạn. Vui lòng mô tả rõ hơn về sản phẩm bạn muốn'
                    };
                    res.json(response);
                }

                break;

            case 'search_blog':
                const blogs = await searchBlogs(message);
                if (blogs.blogs.length > 0) {
                    const blogDetail = blogs.blogs.map(blog => {
                        return {
                            title: blog.title,
                            id: blog._id,
                            images: blog.images[0]
                        };
                    });
                    response = {
                        success: true,
                        blogs: blogDetail,
                        summary: blogs.summary
                    };
                    res.json(response);
                } else {
                    response = {
                        success: false,
                        message: 'Rất tiếc, tôi không tìm thấy bài viết nào phù hợp với yêu cầu của bạn.'
                    };
                    res.json(response);
                }
                break;
            case 'customer_support':
                supportMessage = await support(message);
                response = {
                    success: true,
                    supportMessage
                }
                res.json(response)
                break;
            case 'greeting':
                greeting = 'Chào bạn! Có thể tôi giúp gì cho bạn hôm nay?';
                response = {
                    success: true,
                    greeting
                }
                res.json(response)
                break;
            case 'thank_you':
                thank = 'Cảm ơn bạn! Nếu cần thêm sự trợ giúp, đừng ngần ngại liên hệ nhé!';
                response = {
                    success: true,
                    thank
                }
                res.json(response)
                break;
            case 'feedback':
                feedback = 'Cảm ơn bạn đã phản hồi! Chúng tôi sẽ cải thiện dịch vụ của mình.';
                response = {
                    success: true,
                    feedback
                }
                res.json(response)
                break;
            case 'orther':
                orther = 'Xin lỗi bạn mình chỉ có thể phục vụ bạn vấn đề về thời trang. Hãy thử hỏi câu hỏi khác?';
                response = {
                    success: true,
                    orther
                }
                res.json(response)
                break;
            default:
                response = 'Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể cho tôi biết thêm chi tiết được không? Hoặc thử hỏi một câu hỏi khác?';
        }
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports = { handleChat };
