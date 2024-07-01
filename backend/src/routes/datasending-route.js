import express from 'express';
import bcrypt from 'bcrypt'
import User from '../../database/User.js'; 
const router = express.Router();

router.get('/api/user', async (req, res) => {
  const { email, phone } = req.query;

  try {
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(200).json({ success: true, user });
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/api/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(`Received phone: ${name}`);
  console.log(`Received phone: ${email}`);
  console.log(`Received phone: ${phone}`);
  console.log(`Received phone: ${password}`);
  try {
    
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
        user.name = name;
        user.phone = phone;
        user.password = await bcrypt.hash(password, 10); 
        console.log(`Updated user phone: ${user.phone}`);
        await user.save();
        return res.status(200).json({ success: true, message: 'User data updated successfully' });
    }

   
    user = new User({
      name,
      email,
      phone,
      password: await bcrypt.hash(password, 10)
    });

    console.log(`New user phone: ${user.phone}`);
    await user.save();

    res.status(201).json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
