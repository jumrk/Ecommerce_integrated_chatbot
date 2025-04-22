const User = require('../../model/User');


const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
}

const getUserInfor = async (req, res) => {
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
}

const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
}
const updateUser = async (req, res) => {
    const userId = req.user.userId;

    try {
        console.log("req.body:", req.body);
        console.log("req.file:", req.file);

        const avatarPath = req.file && req.file.filename ? `/images/avatar/${req.file.filename}` : undefined;

        const updateData = {
            ...req.body,
        };

        if (avatarPath) {
            updateData.avatar = avatarPath;
        } else {
            delete updateData.avatar; // Xóa field avatar nếu không có file để tránh gửi {}
        }

        console.log("Dữ liệu cập nhật:", updateData);

        const user = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
            runValidators: true,
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Cập nhật tài khoản thất bại ❌' });
        }

        console.log("User sau cập nhật:", user);

        res.status(200).json({ success: true, message: 'Cập nhật tài khoản thành công ✅', user });
    } catch (error) {
        console.error("Lỗi máy chủ:", error);
        res.status(500).json({ success: false, message: 'Lỗi máy chủ ❌', error: error.message });
    }
};
const updateUserRole = async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy người dùng ❌'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật vai trò thành công ✅',
            user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Cập nhật vai trò thất bại ❌',
            error: error.message
        });
    }
};

const accountLocks = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Khóa tài khoản thất bại ❌' });
        }
        res.status(200).json({ success: true, message: 'Khóa tài khoản thành công ✅', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Khóa tài khoản thất bại ❌' });
    }
}

const openingAccount = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndUpdate(id, { isActive: true }, { new: true });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Mở khóa tài khoản thất bại ❌' });
        }
        res.status(200).json({ success: true, message: 'Mở khóa tài khoản thành công ✅', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Mở khóa tài khoản thất bại ❌' });
    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Xóa tài khoản thành công ✅' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Xóa tài khoản thất bại ❌' });
    }
}

module.exports = { getUsers, getUserInfor, getUserById, updateUser, deleteUser, updateUserRole, accountLocks, openingAccount };







