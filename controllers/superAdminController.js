import bcrypt from 'bcrypt';
import User from '../models/User.js';
import handleErrors from '../middlewares/errorHandlerMiddleware.js';


const createUser = async (req, res) => {
    const { username, email, password } = req.body;
    const role = "hospitalAdmin";

    try {
        const user = await User.create({ username, email, password, role });
        res.status(201).json({ user: user._id });
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};



const updateUser = async (req, res) => {
    const userID = req.params.id;
    const newUserData = req.body;

    if (newUserData.password) {
        const salt = await bcrypt.genSalt();
        newUserData.password = await bcrypt.hash(newUserData.password, salt);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(userID, newUserData, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



const showAllUsers = async (req, res) => {
    try {
        const users = await User.find();


        res.json(formattedUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
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
    createUser,
    // login,
    showAllUsers,
    getUserById,
    updateUser,
    delete_user
};
