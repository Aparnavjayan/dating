import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../../database/User.js'
const router = express.Router();

router.post('/login', async (req, res) => {
    const { phone, email, password } = req.body;
    console.log('Login attempt:', { phone, email,password });
  
    try {
      let user = null;
  
      if (email) {
        user = await User.findOne({ email });
        console.log('User found by email:', user);
      } else if (phone) {
        user = await User.findOne({ phone });
        console.log('User found by phone:', user);
      }
  
      if (!user) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
     
    //   if (!user.password) {
    //     console.error('User password is undefined');
    //     return res.status(500).json({ message: 'Server error: user password is undefined' });
    //   }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      console.log('Password match:', isPasswordCorrect);
  
      if (isPasswordCorrect) {
        const token = jwt.sign(
          { userid: user._id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' } 

      );
      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 3600000 
    });

 
       console.log('Token generated and sent in cookie:',token)
        res.status(200).json({ message: 'Login successful' } );
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/logout', (req, res) => {
    res.clearCookie('authToken'); // Assuming the auth token is stored in a cookie
    res.status(200).json({ message: 'Logout successful' });
  });
  


export default router;