const express = require('express');
const router = express.Router();
const uploadImage = require("../utils/uploadImage");
const { getUsers, getUserById, updateUser, deleteUser, updateUserById, accountLocks, openingAccount } = require('../controller/user/userController');
const { verifyToken } = require('../middleware/auth');
router.get('/', getUsers);
router.post('/get-infor-user', verifyToken, getUserById);

router.put('/update-user', verifyToken, uploadImage("avatar").single("avatar"), updateUser);
router.put('/update-user-by-id', verifyToken, updateUserById);
router.delete('/delete-user/:id', verifyToken, deleteUser);
router.put('/account-locks/:id', verifyToken, accountLocks);
router.put('/opening-account/:id', verifyToken, openingAccount);

module.exports = router;

