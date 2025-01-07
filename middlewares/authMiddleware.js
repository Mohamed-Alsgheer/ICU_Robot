import jwt from 'jsonwebtoken';

// Verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decodedToken;
      next();

    } catch (err) {
      // Invalid token
      res.status(400).json({ message: "Invalid token", error: err.message });
    }
  } else {
    // Missing authorization header
    return res.status(401).json({ message: 'Token is not provided' });
  }
};




export default verifyToken;