// verify-route.js
import express from 'express';
import { sendVerification, checkVerification } from '../middleware/twilioService.js';

const router = express.Router();

router.post('/send-verification', async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const verification = await sendVerification(phoneNumber);
    res.status(200).json({ message: 'Verification sent', verification });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send verification' });
  }
});

router.post('/check-verification', async (req, res) => {
  const { phoneNumber, code } = req.body;

  try {
    const verificationCheck = await checkVerification(`+91${phoneNumber}`, code);
    if (verificationCheck.status === 'approved') {
      res.status(200).json({ message: 'Verification successful' });
    } else {
      res.status(400).json({ error: 'Invalid code' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check verification' });
  }
});

export default router;
