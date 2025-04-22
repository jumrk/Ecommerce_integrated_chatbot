const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const {
    getUserMessages,
    sendUserMessage,
    getAllMailboxes,
    getMailboxById,
    replyToUser
} = require('../controller/message/messageController');

// Routes cho User (cần xác thực)
router.get('/user/messages', verifyToken, getUserMessages);
router.post('/user/send', verifyToken, sendUserMessage);

// Routes cho Admin (không cần xác thực)
router.get('/admin/mailboxes', getAllMailboxes);
router.get('/admin/mailbox/:userId', getMailboxById);
router.post('/admin/reply/:userId', replyToUser);

module.exports = router;