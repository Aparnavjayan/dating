import express from 'express';
import User from '../../database/User.js';
import ShortList from '../../database/ShortList.js';
import Request from '../../database/Request.js';
import authenticateJWT from '../middleware/jwtauthentication.js';
import HiddenProfile from '../../database/HiddenProfiles.js';

const router = express.Router();


// Shortlist a profile
router.post('/shortlist/:userId', authenticateJWT, async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      console.log('logged in user:',loggedInUserId)
      const { userId } = req.params;
      console.log('shortlisted profile:',userId)
  
     
      let loggedInUserShortList = await ShortList.findOne({ userId: loggedInUserId });
      if (!loggedInUserShortList) {
        loggedInUserShortList = new ShortList({ userId: loggedInUserId, shortListedIds: [], shortListedByIds: [] });
      }
  
      
      let targetUserShortList = await ShortList.findOne({ userId: userId });
      if (!targetUserShortList) {
        targetUserShortList = new ShortList({ userId: userId, shortListedIds: [], shortListedByIds: [] });
      }
  
      
      loggedInUserShortList.shortListedIds.addToSet(userId);
      targetUserShortList.shortListedByIds.addToSet(loggedInUserId);
  
     
      await loggedInUserShortList.save();
      await targetUserShortList.save();
  
      res.status(200).send('Profile shortlisted');
    } catch (error) {
      console.error('Error shortlisting profile:', error);
      res.status(500).send('Error shortlisting profile');
    }
  });
  

// Send request
router.post('/sendRequest/:userId', authenticateJWT, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { userId } = req.params;

  
    let loggedInUserRequest = await Request.findOne({ userId: loggedInUserId });
    if (!loggedInUserRequest) {
      loggedInUserRequest = new Request({ userId: loggedInUserId, requestSentIds: [], requestInIds: [], requestAcceptIds: [] });
    }

   
    let targetUserRequest = await Request.findOne({ userId });
    if (!targetUserRequest) {
      targetUserRequest = new Request({ userId, requestSentIds: [], requestInIds: [], requestAcceptIds: [] });
    }

    
    if (!loggedInUserRequest.requestSentIds.includes(userId) && !targetUserRequest.requestInIds.includes(loggedInUserId)) {
     
      loggedInUserRequest.requestSentIds.addToSet(userId);
      targetUserRequest.requestInIds.addToSet(loggedInUserId);

     
      await loggedInUserRequest.save();
      await targetUserRequest.save();

      res.status(200).send('Request sent');
    } else {
      res.status(400).send('Request already sent');
    }
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).send('Error sending request');
  }
});
  

// Get request status
router.get('/requestStatus/:userId', authenticateJWT, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { userId } = req.params;

    const loggedInUserRequest = await Request.findOne({ userId: loggedInUserId });
    console.log('logged in user',loggedInUserRequest)
    const targetUserRequest = await Request.findOne({ userId });
    console.log('target user',targetUserRequest)

    let status = null;
    if (loggedInUserRequest && loggedInUserRequest.requestSentIds.includes(userId)) {
      status = 'sent';
    } else if (targetUserRequest && targetUserRequest.requestSentIds.includes(loggedInUserId)) {
      status = 'received';
    } else if (loggedInUserRequest && loggedInUserRequest.requestAcceptIds.includes(userId)) {
      status = 'accepted';
    }
    console.log(status)
    res.status(200).json({ status });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).send('Error fetching request status');
  }
});




// Accept request
router.post('/acceptRequest/:userId', authenticateJWT, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { userId } = req.params;

    
    let loggedInUserRequest = await Request.findOne({ userId: loggedInUserId });
    console.log('logged in user', loggedInUserRequest)
    let targetUserRequest = await Request.findOne({ userId });
    console.log('target user',targetUserRequest)

    if (!loggedInUserRequest || !targetUserRequest) {
      return res.status(400).send('Request does not exist');
    }

    
    if (loggedInUserRequest.requestInIds.includes(userId) && targetUserRequest.requestSentIds.includes(loggedInUserId)) {
     
      loggedInUserRequest.requestAcceptIds.addToSet(userId);

      await loggedInUserRequest.save();
      await targetUserRequest.save();

      res.status(200).send('Request accepted');
    } else {
      res.status(400).send('No pending request to accept');
    }
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).send('Error accepting request');
  }
});



  

// Hide profile
router.post('/hideProfile/:userId',authenticateJWT, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { userId } = req.params;

    await HiddenProfile.findOneAndUpdate(
      { userId: loggedInUserId },
      { $addToSet: { hiddenProfilesIds: userId } },
      { upsert: true, new: true }
    );

    res.status(200).send('Profile hidden');
  } catch (error) {
    res.status(500).send('Error hiding profile');
  }
});

export default router;
