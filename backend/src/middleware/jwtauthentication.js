import jwt from 'jsonwebtoken';
import User from '../../database/User.js';
import dotenv from 'dotenv';
dotenv.config();

const authenticateJWT = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'token not found' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    const user = await User.findById(decoded.userid);
    console.log('Found user:', user);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized ,user not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default authenticateJWT;
