import express from 'express'
import { getProfiles, likeProfile, dislikeProfile, getNextProfile } from '../controllers/user-controller.js';
import authenticateJWT from '../middleware/jwtauthentication.js';
const router = express.Router();


router.get('/api/profiles', authenticateJWT, getProfiles);
router.post('/api/like', likeProfile);
router.post('/api/dislike', dislikeProfile);
router.get('/api/nextProfile', getNextProfile);

export default router;
