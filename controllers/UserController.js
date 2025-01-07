import User from '../models/User.js';

// تسجيل مستخدم جديد
const create_hospital_admin = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const newUser = new User({ username, email, password, role: false });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// تسجيل دخول المستخدم
// const login = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.login(email, password);
//         res.json({ message: 'Login successful', user });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// الحصول على جميع المستخدمين (يتم فقط للمشرف)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// الحصول على مستخدم معين
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUserData = async (req, res) => {
    const userID = req.params.id;
    const newUserData = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userID,
            newUserData, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// تحديث كلمة مرور المستخدم
const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = password; // سيتم التشفير في الـ pre-save hook
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// تحديث دور المستخدم (فقط للمشرفين)
const delete_user = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Robot not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    create_hospital_admin,
    // login,
    getAllUsers,
    getUserById,
    updateUserData,
    updatePassword,
    delete_user
};
