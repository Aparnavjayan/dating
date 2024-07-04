import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import authenticateJWT from '../middleware/jwtauthentication.js';
import UserDetails from '../../database/UserDetails.js';
import User from '../../database/User.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).fields([
  { name: 'photo', maxCount: 6 },
  { name: 'video', maxCount: 1 }
]);

router.post('/upload', authenticateJWT, upload, async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send('No files uploaded.');
    }

    const { _id } = req.user;
    const user = await User.findById(_id);
    console.log(user)

    if (!user) {
      return res.status(404).send('User not found');
    }

    const userid = user._id;
    const photos = req.files['photo'] || [];
    const video = req.files['video'] ? req.files['video'][0].path : null;

    let updateData = {};

    if (photos.length) {
      updateData.photoUrls = photos.map(photo => photo.path);
    }
    if (video) {
      updateData.videoUrl = video;
    }

    const userDetails = await UserDetails.findOneAndUpdate(
      { userId: userid },
      updateData,
      { new: true }
    );

    if (!userDetails) {
      return res.status(404).send('User details not found');
    }

    res.status(200).send('Files uploaded and linked to user details successfully');
  } catch (err) {
    console.error('Error uploading files:', err);
    res.status(500).send('Error uploading files');
  }
});

export default router;
