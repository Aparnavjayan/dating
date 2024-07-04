import express from 'express';
import UserDetails from '../../database/UserDetails.js';
import User from '../../database/User.js';
import authenticateJWT from '../middleware/jwtauthentication.js';

const router = express.Router();

router.use('/uploads', express.static('uploads'));

router.get('/api/users', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('user id:', userId);
    const user = await User.findById(userId);
    console.log('user found:', user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/api/userData', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user._id;
    console.log('user id:', userId);
    const data = await UserDetails.findOne({ userId });
    console.log('user data found:', data);
    if (!data) {
      return res.status(404).json({ error: "User data not found" });
    }
    data.photoUrls = data.photoUrls.map(url => `/uploads/${url.split('\\').pop()}`);
    console.log('Fetched User Data:', data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
