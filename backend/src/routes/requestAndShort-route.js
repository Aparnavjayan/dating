import express from 'express';
import ShortList from '../../database/ShortList.js';
import Request from '../../database/Request.js';
import HiddenProfile from '../../database/HiddenProfiles.js';
import authenticateJWT from '../middleware/jwtauthentication.js';

const router = express.Router();



// Get shortlisted profiles
router.get('/shortlisted', authenticateJWT, async (req, res) => {
  try {
    const shortList = await ShortList.findOne({ userId: req.user._id }).populate('shortListedIds');
    res.json(shortList ? shortList.shortListedIds : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get profiles shortlisted by the user
router.get('/shortlisted-by', authenticateJWT, async (req, res) => {
  try {
    const shortList = await ShortList.find({ userId: req.user._id }).populate('shortListedByIds');
    console.log('shortlisted by',shortList);
    res.json(shortList.map(sl => sl.shortListedByIds));
    // res.json(shortList ? shortList.shortListedIds : [])
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get request sent profiles
router.get('/requests-sent', authenticateJWT, async (req, res) => {
  try {
    const request = await Request.findOne({ userId: req.user._id }).populate({
      path: 'requestSentIds',
      select: 'name userDetails',
      populate: {
        path: 'userDetails',
        model: 'UserDetails', // Ensure this matches your model name
        select: 'photoUrls'
      }
    });
    console.log('request sent profile', request);
    res.json(request ? request.requestSentIds : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get incoming request profiles
router.get('/requests-in', authenticateJWT, async (req, res) => {
  try {
    const request = await Request.findOne({ userId: req.user._id }).populate('requestInIds');
    res.json(request ? request.requestInIds : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get request accept profiles
router.get('/requests-accept', authenticateJWT, async (req, res) => {
  try {
    const request = await Request.findOne({ userId: req.user._id }).populate('requestAcceptIds');
    res.json(request ? request.requestAcceptIds : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Get request reject profiles
router.get('/requests-reject', authenticateJWT, async (req, res) => {
  try {
    const request = await HiddenProfile.findOne({ userId: req.user._id }).populate('hiddenProfilesIds');
    res.json(request ? request.hiddenProfilesIds : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//Accept request
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


//Reject request
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



//Cancel request
router.post('/requests/cancel', authenticateJWT, async (req, res) => {
  const { profileId } = req.body;
  console.log('profile id', profileId);

  try {
    // Update the request for the sender
    const senderRequest = await Request.findOne({ userId: req.user._id });
    console.log('sender request', senderRequest);
    if (senderRequest) {
      senderRequest.requestSentIds.pull(profileId);
      senderRequest.requestAcceptIds.pull(profileId);
      senderRequest.requestRejectedIds.pull(profileId);
      await senderRequest.save();
    }

    // Update the request for the receiver
    const receiverRequest = await Request.findOne({ userId: profileId });
    console.log('receiver request', receiverRequest);
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
