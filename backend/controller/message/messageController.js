const Message = require('../../model/Message');
const User = require('../../model/User');
const Mailbox = require('../../model/Message');

// Gửi tin nhắn từ user
const sendUserMessage = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { content } = req.body;

        let mailbox = await Mailbox.findOne({ userId });

        if (!mailbox) {
            // Tạo hộp thư mới nếu chưa có
            mailbox = new Mailbox({ userId });
        }

        // Thêm tin nhắn mới
        mailbox.messages.push({
            content,
            sender: 'customer'
        });

        await mailbox.save();

        res.status(201).json({
            success: true,
            message: 'Gửi tin nhắn thành công ✅',
            data: mailbox.messages[mailbox.messages.length - 1]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi gửi tin nhắn ❌',
            error: error.message
        });
    }
};

// Lấy tin nhắn của user
const getUserMessages = async (req, res) => {
    try {
        const userId = req.user.userId;
        const mailbox = await Mailbox.findOne({ userId });

        if (!mailbox) {
            return res.json({
                success: true,
                data: []
            });
        }

        res.json({
            success: true,
            data: mailbox.messages
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tin nhắn ❌',
            error: error.message
        });
    }
};

// Lấy danh sách tất cả hộp thư cho admin
const getAllMailboxes = async (req, res) => {
    try {
        const mailboxes = await Mailbox.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInfo'
                }
            },
            { $unwind: '$userInfo' },
            {
                $project: {
                    userId: 1,
                    'userInfo.fullName': 1,
                    'userInfo.email': 1,
                    'userInfo.avatar': 1,
                    lastMessage: { $arrayElemAt: ['$messages', -1] },
                    unreadCount: {
                        $size: {
                            $filter: {
                                input: '$messages',
                                as: 'message',
                                cond: {
                                    $and: [
                                        { $eq: ['$$message.sender', 'customer'] },
                                        { $eq: ['$$message.isRead', false] }
                                    ]
                                }
                            }
                        }
                    }
                }
            },
            { $sort: { 'lastMessage.createdAt': -1 } }
        ]);

        res.json({
            success: true,
            data: mailboxes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách hộp thư ❌',
            error: error.message
        });
    }
};

// Lấy chi tiết hộp thư theo userId
const getMailboxById = async (req, res) => {
    try {
        const { userId } = req.params;
        const mailbox = await Mailbox.findOne({ userId })
            .populate('userId', 'fullName email avatar');

        if (!mailbox) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy hộp thư ❌'
            });
        }

        // Đánh dấu tất cả tin nhắn của customer là đã đọc
        mailbox.messages = mailbox.messages.map(msg => {
            if (msg.sender === 'customer' && !msg.isRead) {
                msg.isRead = true;
            }
            return msg;
        });
        await mailbox.save();

        res.json({
            success: true,
            data: {
                userId: mailbox.userId._id,
                userInfo: {
                    fullName: mailbox.userId.fullName,
                    email: mailbox.userId.email,
                    avatar: mailbox.userId.avatar
                },
                messages: mailbox.messages
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy chi tiết hộp thư ❌',
            error: error.message
        });
    }
};

// Admin trả lời tin nhắn
const replyToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { content } = req.body;

        let mailbox = await Mailbox.findOne({ userId });
        if (!mailbox) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy hộp thư ❌'
            });
        }

        const newMessage = {
            content,
            sender: 'support',
            createdAt: new Date(),
            isRead: false
        };

        mailbox.messages.push(newMessage);
        await mailbox.save();

        res.status(200).json({
            success: true,
            message: 'Gửi tin nhắn thành công ✅',
            data: newMessage
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi gửi tin nhắn ❌',
            error: error.message
        });
    }
};

module.exports = {
    getUserMessages,
    sendUserMessage,
    replyToUser,
    getAllMailboxes,
    getMailboxById
};