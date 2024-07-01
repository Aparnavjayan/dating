import express from 'express';
import UserDetails from '../../database/UserDetails.js'; 
import User from '../../database/User.js';
import authenticateJWT from '../middleware/jwtauthentication.js';

const router = express.Router();

router.post('/api/user-details', authenticateJWT, async (req, res) => {
  const { dateOfBirth, age, gender, education, occupation, hobby, preferences } = req.body;
  
  console.log('Date of Birth:', dateOfBirth);
console.log('Age:', age);
console.log('Gender:', gender);
console.log('Education:', education);
console.log('Occupation:', occupation);
console.log('Hobby:', hobby);
console.log('Preferences:', preferences);

  const { _id } = req.user ;
  if (!dateOfBirth || !age || !gender || !education || !occupation || !hobby || !preferences) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const userDetails = new UserDetails({
      userId: _id,
      dateOfBirth,
      age,
      gender,
      education,
      occupation,
      hobby,
      preferences
    });

    await userDetails.save();
    return res.status(200).json({ success: true, message: 'User details saved successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});



router.post('/api/gender', authenticateJWT, async (req, res) => {
  const { selectedGender } = req.body;
  const { _id } = req.user;

  console.log('Selected Gender:', selectedGender);

  if (!selectedGender) {
    return res.status(400).json({ success: false, message: 'Selected gender is required.' });
  }

  try {
    const updatedUser = await UserDetails.findOneAndUpdate(
      { userId: _id },
      { selectedGender },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({ success: true, message: 'Gender selection updated successfully.' });
  } catch (error) {
    console.error('Error updating gender selection:', error);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
