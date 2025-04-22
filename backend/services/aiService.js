const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const Product = require('../model/Product');
const Blog = require('../model/Blog')
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GOOGLE_AI_API_KEY}`;


async function analyzeMessageWithAI(message) {
    const prompt = {
        contents: [{
            parts: [{
                text: `Phân tích nội dung tin nhắn sau để xác định **ý định chính (intent)** của khách hàng. 
Chỉ chọn một trong các intent sau:

- "search_product": khi khách hàng muốn **mua sản phẩm** cụ thể, ví dụ như tìm áo, quần, giày, hoặc lọc theo giá, màu sắc, size...
- "search_blog": khi khách hàng muốn **tìm bài viết hoặc đọc thông tin** như xu hướng, mẹo phối đồ, chia sẻ kinh nghiệm,...
- "customer_support": khi khách hàng muốn được **tư vấn hoặc gợi ý** nên mặc gì, phối đồ sao cho phù hợp (ví dụ hỏi nên mặc gì cho chiều cao, cân nặng, giới tính,...)
- "greeting": khi khách hàng chỉ chào hỏi.
- "thank_you": khi khách hàng cảm ơn.
- "feedback": khi khách hàng phản hồi hoặc góp ý.
- "other": nếu không thuộc các ý định trên.

**Chỉ trả về đúng 1 intent . Không cần giải thích thêm.**

Ví dụ:
- "Tôi cần áo khoác màu đen" → search_product
- "Xu hướng thời trang hè 2025 là gì?" → search_blog
- "Tôi nặng 49kg cao 1m60 và là nam, nên mặc gì?" → "customer_support"

Tin nhắn khách hàng: "${message}"
`
            }]
        }]
    };

    try {
        const response = await axios.post(url, prompt, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No valid response from AI');
        }
    } catch (error) {
        console.error('Error analyzing message with AI:', error);
        throw error;
    }
}
async function AnalyticalExpertiseWithAI(message, type = 'product') {
    let promptText = '';

    if (type === 'product') {
        promptText = `Phân tích yêu cầu sau để trích xuất thông tin chi tiết về sản phẩm mà khách hàng quan tâm. 
    Nếu có thể, hãy đưa ra các từ khóa liên quan đến yêu cầu của khách hàng và liệt kê đầy đủ nhất có thể
    (ví dụ: khách hàng cần tìm áo ấm thì liệt kê các keywords áo hoodie, áo khoác, áo len, áo sweater...),
    mức giá (ví dụ: từ 100 đến 200 ngàn), màu sắc (nếu có), size hoặc các đặc điểm khác. 
    
    Nếu khách hàng muốn tìm sản phẩm theo lượng đánh giá, hãy thêm trường "rating": với value là dạng số 1->5 tùy thuộc vào yêu cầu của khách hàng
    ví dụ khách hàng muốn tìm sản phẩm có lượng đánh giá cao nhất thì rating với value là 5
    thêm 1 ví dụ nữa là khách hàng muốn tìm sản phẩm có đánh giá tốt thì bạn hãy tự đưa ra value miễn sao cho phù hợp với yêu cầu
    
    Nếu khách hàng muốn tìm sản phẩm bán chạy, hãy đặt "sold": "high" hoặc "sold": "top" trong JSON để thể hiện họ muốn sản phẩm có số lượng bán cao.
    Ví dụ: khách hàng nói "cho tôi xem sản phẩm bán chạy nhất", thì "sold": "top"
    Tin nhắn: "${message}" 
    
    Trả lời duy nhất bằng JSON hợp lệ như sau:
    {
        "keywords": ["..."],
        "priceRange": { "min": ..., "max": ... },
        "sold" : "...",
        "color": "...",
        "size": "...",
        "rating": "..."
    }`;
    }
    else if (type === 'blog') {
        promptText = `Phân tích yêu cầu sau để xác định các từ khóa liên quan đến bài viết thời trang mà khách hàng đang tìm. 
Hãy chỉ trích xuất các chủ đề hoặc từ khóa liên quan đến bài viết (ví dụ: xu hướng mùa hè, phối đồ, mẹo mặc đẹp,...).
Tin nhắn: "${message}" 
Trả lời theo JSON dạng:
{
    "keywords": ["..."]
}`;
    }

    const prompt = {
        contents: [{
            parts: [{
                text: promptText
            }]
        }]
    };

    try {
        const response = await axios.post(url, prompt, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const aiText = response.data.candidates[0].content.parts[0].text;

        // Loại bỏ ký hiệu Markdown và kiểm tra nội dung
        const cleanedText = aiText.replace(/```json|```/g, '').trim();

        // Kiểm tra xem có phải JSON không
        if (!cleanedText.startsWith('{')) {
            console.error('AI response is not JSON:', cleanedText);
            return {
                keywords: [],
                priceRange: { min: null, max: null },
                sold: null,
                color: null,
                size: null,
                rating: null
            };
        }

        try {
            const parsed = JSON.parse(cleanedText);
            return parsed;
        } catch (err) {
            console.error('JSON parse error:', err);
            return {
                keywords: [],
                priceRange: { min: null, max: null },
                sold: null,
                color: null,
                size: null,
                rating: null
            };
        }
    } catch (error) {
        console.error('Error analyzing message with AI:', error);
        return {
            keywords: [],
            priceRange: { min: null, max: null },
            sold: null,
            color: null,
            size: null,
            rating: null
        };
    }
}

async function searchProducts(message) {
    const extracted = await AnalyticalExpertiseWithAI(message, 'product');

    // Kiểm tra nếu extracted là null hoặc không có keywords
    if (!extracted || !extracted.keywords) {
        return {
            products: [],
            summary: "Xin lỗi, tôi không thể hiểu yêu cầu của bạn. Bạn có thể mô tả rõ hơn về sản phẩm bạn đang tìm kiếm không?"
        };
    }

    const query = { $and: [] };

    // Tìm theo từ khóa (keywords)
    if (extracted.keywords && extracted.keywords.length > 0) {
        const keywordConditions = extracted.keywords.map(keyword => ({
            name: { $regex: keyword, $options: 'i' }
        }));
        query.$and.push({ $or: keywordConditions });
    }

    // Lọc theo khoảng giá (priceRange)
    if (extracted.priceRange?.min !== null && extracted.priceRange?.max !== null) {
        query.$and.push({
            price: { $gte: extracted.priceRange.min, $lte: extracted.priceRange.max }
        });
    }

    // Lọc theo kích thước (sizes)
    if (extracted.size) {
        query.$and.push({
            sizes: { $in: [extracted.size] }
        });
    }
    // Lọc bán chay
    let sortOptions = {};

    if (extracted.sold === "top" || extracted.sold === "high") {
        sortOptions = { sold: -1 };
    }

    // Nếu không có điều kiện nào, bỏ $and để tránh lỗi
    if (query.$and.length === 0) {
        delete query.$and;
    }


    try {
        let products = await Product.find(query).limit(5);
        let response = {
            products: products,
            summary: null
        };

        if (products.length > 0) {
            const prompt = {
                contents: [{
                    parts: [{
                        text: `Dựa trên kết quả tìm kiếm sản phẩm sau, hãy tạo một phản hồi thông minh và hữu ích cho khách hàng.
                        Kết quả tìm kiếm: ${JSON.stringify(products.map(p => ({
                            name: p.name,
                            price: p.price,
                            category: p.category,
                            sold: p.sold,
                            description: p.description,
                            colors: p.colors,
                            sizes: p.sizes
                        })))}
                        Yêu cầu của khách hàng: "${message}"
                        Hãy tạo một phản hồi ngắn gọn, thân thiện và hữu ích, bao gồm:
                        1. Xác nhận đã tìm thấy sản phẩm phù hợp
                        2. Mô tả ngắn gọn về các sản phẩm tìm được
                        3. Gợi ý cách chọn sản phẩm phù hợp dựa trên màu sắc và kích thước có sẵn
                        4. Nếu có yêu cầu về đánh giá, thêm thông tin về đánh giá của sản phẩm
                        Chỉ trả lời bằng văn bản, không cần định dạng.`
                    }]
                }]
            };

            try {
                const aiResponse = await axios.post(url, prompt, {
                    headers: { 'Content-Type': 'application/json' }
                });
                response.summary = aiResponse.data.candidates[0].content.parts[0].text;
            } catch (error) {
                console.error('Error generating summary:', error);
            }
        }

        return response;
    } catch (error) {
        console.error('Error in searchProducts:', error);
        throw error;
    }
}

async function searchBlogs(message) {
    const extracted = await AnalyticalExpertiseWithAI(message, 'blog');
    console.log('Extracted data:', extracted);

    const query = { $and: [] };

    if (extracted.keywords && extracted.keywords.length > 0) {
        const keywordConditions = extracted.keywords.map(keyword => ({
            $or: [
                { title: { $regex: keyword, $options: 'i' } },
                { content: { $regex: keyword, $options: 'i' } }
            ]
        }));
        query.$and.push({ $or: keywordConditions });
    }

    if (query.$and.length === 0) {
        delete query.$and;
    }

    try {
        const blogs = await Blog.find(query).limit(5);

        let response = {
            blogs: blogs,
            summary: null
        };

        if (blogs.length > 0) {
            const prompt = {
                contents: [{
                    parts: [{
                        text: `Dựa trên kết quả tìm kiếm bài viết sau, hãy tạo một phản hồi thông minh và hữu ích cho khách hàng.
                        Kết quả tìm kiếm: ${JSON.stringify(blogs.map(b => ({
                            title: b.title,
                            content: b.content.substring(0, 200) + '...',
                            tags: b.tags
                        })))}
                        Yêu cầu của khách hàng: "${message}"
                        Hãy tạo một phản hồi ngắn gọn, thân thiện và hữu ích, bao gồm:
                        1. Xác nhận đã tìm thấy bài viết phù hợp
                        2. Tóm tắt ngắn gọn nội dung các bài viết
                        3. Gợi ý bài viết nào phù hợp nhất với nhu cầu của khách hàng
                        4. Nếu có nhiều bài viết, sắp xếp theo mức độ liên quan
                        Chỉ trả lời bằng văn bản, không cần định dạng.`
                    }]
                }]
            };

            try {
                const aiResponse = await axios.post(url, prompt, {
                    headers: { 'Content-Type': 'application/json' }
                });
                response.summary = aiResponse.data.candidates[0].content.parts[0].text;
            } catch (error) {
                console.error('Error generating summary:', error);
            }
        }

        return response;
    } catch (error) {
        console.error('Error in searchBlogs:', error);
        throw error;
    }
}
// suppor
async function support(message) {
    const prompt = {
        contents: [{
            parts: [{
                text: `Phân tích tin nhắn khách hàng sau đây về vấn đề support viết giúp tôi câu trả lời vừa đủ không ngắn cũng không 
                dài quá đề giúp khách hàng hiểu rỏ hơn nếu mà khách hàng hỏi về vấn đề đó là đơn hàng hoặc sản phẩm thì hãy 
                trả lời bạn có thể liên hệ trực tiếp với shop bên phần liên hệ còn lại về vấn đề khác thì bạn có thể tự đưa ra câu trả lời
                giúp tôi tin nhắn ${message}   
                `
            }]
        }]
    };

    try {
        const response = await axios.post(url, prompt, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            return response.data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('No valid response from AI');
        }
    } catch (error) {
        console.error('Error analyzing message with AI:', error);
        throw error;
    }
}

module.exports = { support, searchBlogs, analyzeMessageWithAI, searchProducts };