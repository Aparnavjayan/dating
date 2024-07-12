import express from 'express';
import User from '../../database/User.js';
import UserDetails from '../../database/UserDetails.js';
import authenticateJWT from '../middleware/jwtauthentication.js';


const router = express.Router();


router.put('/user/profile', authenticateJWT, async (req, res) => {
    const { name, email, phone, userType, companyName, designation, location, expertiseLevel, relationshipType } = req.body;
    
    try {
      const user = await User.findById(req.user.id);
  
      if (user) {
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.userType = userType;
        user.companyName = companyName;
        user.designation = designation;
        user.location = location;
        user.expertiseLevel = expertiseLevel;
        user.relationshipType = relationshipType;
  
        await user.save();
        res.json(user);
      } else {
        res.status(404).json({ msg: 'User not found' });
      }
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  
 
  router.put('/user/details', authenticateJWT, async (req, res) => {
    const { dateOfBirth, age, gender, education, occupation, location, preferences, shortBio, photoUrls, videoUrl } = req.body;
    
    try {
      let userDetails = await UserDetails.findOne({ userId: req.user.id });
  
      if (userDetails) {
        userDetails.dateOfBirth = dateOfBirth;
        userDetails.age = age;
        userDetails.gender = gender;
        userDetails.education = education;
        userDetails.occupation = occupation;
        userDetails.location = location;
        userDetails.preferences = preferences;
        userDetails.shortBio = shortBio;
        userDetails.photoUrls = photoUrls;
        userDetails.videoUrl = videoUrl;
  
        await userDetails.save();
        res.json(userDetails);
      } else {
        res.status(404).json({ msg: 'User details not found' });
      }
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  






export default router;