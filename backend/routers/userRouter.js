const express = require('express');
const router = express.Router();
const uploadImage = require("../utils/uploadImage");
const { getUsers, getUserById, getUserInfor, updateUser, deleteUser, updateUserRole, accountLocks, openingAccount } = require('../controller/user/userController');
const { verifyToken } = require('../middleware/auth');
router.get('/', getUsers);
router.post('/get-infor-user', verifyToken, getUserInfor);

router.get('/get-user-by-id/:id', getUserById)
router.put('/update-user', verifyToken, uploadImage("avatar").single("avatar"), updateUser);
router.put('/update-user-Role/:id', updateUserRole);
router.delete('/delete-user/:id', deleteUser);
router.put('/account-locks/:id', accountLocks);
router.put('/opening-account/:id', openingAccount);

module.exports = router;

