import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const verifyToken = async (req, res, next) => {
  const token = req.cookies.jwt; 
  console.log("🍪 JWT Cookie:", token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded.userId).select('-password'); 
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default verifyToken;
