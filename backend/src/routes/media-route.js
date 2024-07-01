import express from 'express';
import multer from 'multer';
import authenticateJWT from '../middleware/jwtauthentication.js';
import UserDetails from '../../database/UserDetails.js';
import User from '../../database/User.js';
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload/photo', authenticateJWT, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    const userid = user.userId;
    const photoPath = req.file.path;
    const userDetails = await UserDetails.findOneAndUpdate(
        { userId: userid },
        { photoUrl: photoPath },
        { new: true }
      );

    if (!userDetails) {
      return res.status(404).send('User details not found');
    }

    res.status(200).send('Photo uploaded and linked to user details successfully');
  } catch (err) {
    console.error('Error uploading photo:', err);
    res.status(500).send('Error uploading photo');
  }
});

router.post('/upload/video', authenticateJWT, upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const { _id } = req.user;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send('User not found');
    }
    const userid = user.userId;
    const videoPath = req.file.path;
    const userDetails = await UserDetails.findOneAndUpdate(
        { userId: userid },
        { videoUrl: videoPath },
        { new: true }
      );

    if (!userDetails) {
      return res.status(404).send('User details not found');
    }

    res.status(200).send('Video uploaded and linked to user details successfully');
  } catch (err) {
    console.error('Error uploading video:', err);
    res.status(500).send('Error uploading video');
  }
});

export default router;
