import express from 'express';
import ShortList from '../../database/ShortList.js';
import Request from '../../database/Request.js';
import HiddenProfile from '../../database/HiddenProfiles.js';
import UserDetails from '../../database/UserDetails.js';
import User from '../../database/User.js';
import authenticateJWT from '../middleware/jwtauthentication.js';

const router = express.Router();

// Get shortlisted profiles
router.get('/shortlisted', authenticateJWT, async (req, res) => {
  try {
    const shortList = await ShortList.findOne({ userId: req.user._id }).select('shortListedIds');
    if (!shortList) {
      return res.json([]);
    }

    const shortListedIds = shortList.shortListedIds || [];
    const userDetails = await UserDetails.find({ userId: { $in: shortListedIds } }).select('photoUrls userId');
    const users = await User.find({ _id: { $in: shortListedIds } }).select('name');

    const result = shortListedIds.map(id => {
      const details = userDetails.find(detail => detail.userId.toString() === id.toString());
      const user = users.find(u => u._id.toString() === id.toString());
      return {
        userId: id,
        name: user ? user.name : 'Unknown',
        photoUrls: details ? details.photoUrls : []
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get profiles shortlisted by the user
router.get('/shortlisted-by', authenticateJWT, async (req, res) => {
  try {
    const shortList = await ShortList.findOne({ userId: req.user._id }).select('shortListedByIds');
    if (!shortList) {
      return res.json([]);
    }

    const shortListedByIds = shortList.shortListedByIds || [];
    const userDetails = await UserDetails.find({ userId: { $in: shortListedByIds } }).select('photoUrls userId');
    const users = await User.find({ _id: { $in: shortListedByIds } }).select('name');

    const result = shortListedByIds.map(id => {
      const details = userDetails.find(detail => detail.userId.toString() === id.toString());
      const user = users.find(u => u._id.toString() === id.toString());
      return {
        userId: id,
        name: user ? user.name : 'Unknown',
        photoUrls: details ? details.photoUrls : []
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get request sent profiles
router.get('/requests-sent', authenticateJWT, async (req, res) => {
  try {
    const request = await Request.findOne({ userId: req.user._id }).select('requestSentIds');

    if (!request) {
      console.log(`No request record found for user: ${req.user._id}`);
      return res.json([]);
    }

    const requestSentIds = request.requestSentIds || [];
    
    if (requestSentIds.length === 0) {
      console.log(`No sent requests for user: ${req.user._id}`);
      return res.json([]);
    }

    const userDetails = await UserDetails.find({ userId: { $in: requestSentIds } }).select('photoUrls userId');
    const users = await User.find({ _id: { $in: requestSentIds } }).select('name');

    const result = requestSentIds.map(id => {
      const details = userDetails.find(detail => detail.userId.toString() === id.toString());
      const user = users.find(u => u._id.toString() === id.toString());
      return {
        userId: id,
        name: user ? user.name : 'Unknown',
        photoUrls: details ? details.photoUrls : []
      };
    });

    res.json(result);
  } catch (error) {
    console.error('Error fetching sent requests:', error);
    res.status(500).json({ message: error.message });
  }
});
// Get incoming request profiles
router.get('/requests-in', authenticateJWT, async (req, res) => {
  try {
    const request = await Request.findOne({ userId: req.user._id }).select('requestInIds');
    if (!request) {
      return res.json([]);
    }

    const requestInIds = request.requestInIds || [];
    const userDetails = await UserDetails.find({ userId: { $in: requestInIds } }).select('photoUrls userId');
    const users = await User.find({ _id: { $in: requestInIds } }).select('name');

    const result = requestInIds.map(id => {
      const details = userDetails.find(detail => detail.userId.toString() === id.toString());
      const user = users.find(u => u._id.toString() === id.toString());
      return {
        userId: id,
        name: user ? user.name : 'Unknown',
        photoUrls: details ? details.photoUrls : []
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get request accept profiles
router.get('/requests-accept', authenticateJWT, async (req, res) => {
  try {
    const request = await Request.findOne({ userId: req.user._id }).select('requestAcceptIds');
    if (!request) {
      return res.json([]);
    }

    const requestAcceptIds = request.requestAcceptIds || [];
    const userDetails = await UserDetails.find({ userId: { $in: requestAcceptIds } }).select('photoUrls userId');
    const users = await User.find({ _id: { $in: requestAcceptIds } }).select('name');

    const result = requestAcceptIds.map(id => {
      const details = userDetails.find(detail => detail.userId.toString() === id.toString());
      const user = users.find(u => u._id.toString() === id.toString());
      return {
        userId: id,
        name: user ? user.name : 'Unknown',
        photoUrls: details ? details.photoUrls : []
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get request reject profiles
router.get('/requests-reject', authenticateJWT, async (req, res) => {
  try {
    const request = await HiddenProfile.findOne({ userId: req.user._id }).select('hiddenProfilesIds');
    if (!request) {
      return res.json([]);
    }

    const hiddenProfilesIds = request.hiddenProfilesIds || [];
    const userDetails = await UserDetails.find({ userId: { $in: hiddenProfilesIds } }).select('photoUrls userId');
    const users = await User.find({ _id: { $in: hiddenProfilesIds } }).select('name');

    const result = hiddenProfilesIds.map(id => {
      const details = userDetails.find(detail => detail.userId.toString() === id.toString());
      const user = users.find(u => u._id.toString() === id.toString());
      return {
        userId: id,
        name: user ? user.name : 'Unknown',
        photoUrls: details ? details.photoUrls : []
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Accept request
router.post('/requests/accept', authenticateJWT, async (req, res) => {
  const { profileId } = req.body;
  try {
    const request = await Request.findOne({ userId: req.user._id });
    if (request) {
      request.requestInIds.pull(profileId);
      request.requestAcceptIds.addToSet(profileId);
      await request.save();
    }
    res.json({ message: 'Request accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject request
router.post('/requests/reject', authenticateJWT, async (req, res) => {
  const { profileId } = req.body;
  try {
    const request = await Request.findOne({ userId: req.user._id });
    if (request) {
      request.requestInIds.pull(profileId);
      request.requestRejectedIds.addToSet(profileId);
      await request.save();
    }
    res.json({ message: 'Request rejected' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Cancel request
router.post('/requests/cancel', authenticateJWT, async (req, res) => {
  const { profileId } = req.body;
  try {
    // Update the request for the sender
    const senderRequest = await Request.findOne({ userId: req.user._id });
    if (senderRequest) {
      senderRequest.requestSentIds.pull(profileId);
      senderRequest.requestAcceptIds.pull(profileId);
      senderRequest.requestRejectedIds.pull(profileId);
      await senderRequest.save();
    }

    // Update the request for the receiver
    const receiverRequest = await Request.findOne({ userId: profileId });
    if (receiverRequest) {
      receiverRequest.requestInIds.pull(req.user._id);
      receiverRequest.requestAcceptIds.pull(req.user._id);
      receiverRequest.requestRejectedIds.pull(req.user._id);
      await receiverRequest.save();
    }

    res.json({ message: 'Request canceled' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
