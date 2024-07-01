import express from 'express';
import User from '../../database/User.js'; 
import authenticateJWT from '../middleware/jwtauthentication.js'

const router = express.Router();

router.post('/api/relationship-type',authenticateJWT, async (req, res) => {
  const {relationshipType } = req.body;
  const { email, _id } = req.user;
  console.log(`Received request with email: ${email}, userid: ${_id}, relationshipType: ${relationshipType}`);
  

  if (!email || !_id) {
    return res.status(400).json({ success: false, message: 'Email or user ID is required' });
  }
  try {
    let user;

    if (email) {
      user = await User.findOneAndUpdate({ email }, { relationshipType }, { new: true });
    } else {
      user = await User.findOneAndUpdate({ _id:_id }, { relationshipType }, { new: true });
    }

    if (user) {
      return res.status(200).json({ success: true, message: 'Relationship type updated' });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
