import express from 'express';
import jwt from 'jsonwebtoken';
import { sendVerification, checkVerification } from '../middleware/twilioService.js';
import User from '../../database/User.js';

const router = express.Router();

router.post('/send-verification', async (req, res) => {
  const { phone } = req.body;

  try {
    console.log('Sending verification to:', phone);
    const verification = await sendVerification(phone);
    console.log('Verification Response:', verification);
    res.status(200).json({ message: 'Verification sent', verification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification' });
  }
});

router.post('/check-verification', async (req, res) => {
  const { phone, code, name } = req.body;

  try {
    console.log('Checking verification for:', phone, name);
    const verificationCheck = await checkVerification(phone, code);
    console.log('Verification Check Response:', verificationCheck);
    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phone });
      console.log('before', user);
      if (!user) {
        user = new User({ phone, name });
        console.log('after', user);
        await user.save();
      }
      const token = jwt.sign(
        { userid: user._id, phone: user.phone },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
      console.log(token)
      if (!token) {
        return res.status(404).json({ message: 'Token not found' });
      }

      res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/'
      });
      // res.cookie('userid', user._id.toString(), {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === 'production',
      //   sameSite: 'strict',
      //   path: '/'
      // });
      console.log(user)
      req.session.user = user;
      console.log(req.session.user);
      // res.status(200).json({ message: 'Verification successful' });
      res.redirect('/register');
    } else {
      res.status(400).json({ error: 'Invalid code' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check verification' });
  }
});


// router.post('/update-phone', async (req, res) => {
//   const { phone,name } = req.body;
//   console.log(phone,name);
//   const userId = req.user._id ;
//   console.log(userId)
//   try {
//     console.log('Updating phone number for user:', userId);
//     await User.findByIdAndUpdate(userId, { phone ,name });
//     res.status(200).json({ message: 'Phone number updated' });
//   } catch (error) {
//     console.error('Error updating phone number:', error);
//     res.status(500).json({ error: 'Failed to update phone number' });
//   }
// });

export default router;
