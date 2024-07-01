import express from 'express';
import User from '../../database/User.js'; 

const router = express.Router();

router.post('/api/employment', async (req, res) => {
    const { email, phone, userType, companyName, designation, location, expertiseLevel} = req.body;
  
    try {
        let user = await User.findOne({ $or: [{ email }, { phone }] });
        if (user) {
            user.userType = userType;
            user.companyName = companyName;
            user.designation = designation;
            user.location = location;
            user.expertiseLevel = expertiseLevel;
            await user.save();
            return res.status(200).json({ success: true, message: "employment status updated"})
        } 
    }catch (error) {
        console.error(error.message);
    res.status(500).send('Server error');
    }
  });

  export default router;