import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import handleErrors from '../middlewares/errorHandlerMiddleware.js';


const register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ user: user._id });
  } catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    // create json web token
    const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: 3 * 24 * 60 * 60 }); // 3 days

    res.status(200).json({ jwt: token });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }

}

export default {
  register,
  login
};