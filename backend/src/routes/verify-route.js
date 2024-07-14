import express from 'express';
import twilio from 'twilio';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../../database/User.js';

dotenv.config();
const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID;
const jwtSecret = process.env.JWT_SECRET;
const client = twilio(accountSid, authToken);

router.post('/verify/send-verification', (req, res) => {
  const { phone } = req.body;
  client.verify.v2.services(serviceId)
    .verifications
    .create({ to: `+91${phone}`, channel: 'sms' })
    .then(verification => res.json({ success: true, message: 'OTP sent', verification }))
    .catch(error => res.status(500).json({ success: false, message: 'Error sending OTP', error }));
});

router.post('/verify/check-verification', async (req, res) => {
  const { phone, code } = req.body;
  try {
    const verificationCheck = await client.verify.v2.services(serviceId)
      .verificationChecks
      .create({ to: `+91${phone}`, code });

    if (verificationCheck.status === 'approved') {
      let user = await User.findOne({ phone });

      if (!user) {
        user = new User({ phone });
        await user.save();
      }

      const token = jwt.sign({ userid: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });

      if (!token) {
        return res.status(404).json({ message: 'Token not found' });
      }

      res.cookie('jwt', token, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        path: '/'
      });
      res.cookie('userid', user._id.toString(), { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',
        path: '/'
      });

      req.session.user = user;
      res.json({ success: true, message: 'OTP verified', token });
    } else {
      res.json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP', error });
  }
});

export default router;
