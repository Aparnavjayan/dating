import express from 'express';
import UserDetails from '../../database/UserDetails.js'; 
import User from '../../database/User.js';
import authenticateJWT from '../middleware/jwtauthentication.js';

const router = express.Router();

router.get('/api/users', authenticateJWT, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);  
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
        const data = await UserDetails.findOne({ userId });  
        if (!data) {
            return res.status(404).json({ error: "User data not found" });
        }
        res.json(data);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
