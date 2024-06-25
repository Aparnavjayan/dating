import express from 'express';
const router = express.Router();
import User from '../../database/User.js'; 


router.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
        user.name = name;
        user.phone = phone;
        user.password = password; 
        await user.save();
        return res.status(200).json({ success: true, message: 'User data updated successfully' });
    }

   
    user = new User({
      name,
      email,
      phone,
      password
    });

    
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
