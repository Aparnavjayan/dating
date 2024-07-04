import User from '../../database/User.js';
import UserDetails from '../../database/UserDetails.js';

export const getProfiles = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log(userId)

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

      
        const loggedInUser = await User.findOne(userId);
        console.log('logged in user',loggedInUser)

        if (!loggedInUser) {
            return res.status(404).json({ error: 'User not found' }); 
        }
         const userid = loggedInUser.userId;
        const loggedInUserDetails = await UserDetails.findOne({ userid });
        

        if (!loggedInUserDetails) {
            return res.status(404).json({ error: 'User details not found' });
        }

        console.log('Logged in user details:', loggedInUserDetails);

        
        const qualificationProfiles = await UserDetails.find({ qualification: loggedInUserDetails.education }).exec();
        const occupationProfiles = await UserDetails.find({ occupation: loggedInUserDetails.occupation }).exec();
        const locationProfiles = await UserDetails.find({ location: loggedInUserDetails.location }).exec();
        console.log('qualification',qualificationProfiles);
        console.log('occupation',occupationProfiles)
        console.log('location',locationProfiles)
        res.json({
            qualificationProfiles,
            occupationProfiles,
            locationProfiles
        });
    } catch (error) {
        console.error('Error fetching profiles:', error);
        res.status(500).json({ error: 'Error fetching profiles' });
    }
};


export const likeProfile = async (req, res) => {
    const { userId, profileId } = req.body;
    await User.findByIdAndUpdate(userId, { $push: { likedProfiles: profileId } });
    res.json({ success: true });
};

export const dislikeProfile = async (req, res) => {
    const { userId, profileId } = req.body;
    await User.findByIdAndUpdate(userId, { $push: { dislikedProfiles: profileId } });
    res.json({ success: true });
};

export const getNextProfile = async (req, res) => {
    const { userId, location, education, qualification } = req.query;
    const user = await User.findById(userId);
    const profiles = await UserData.find({
        location,
        education,
        qualification,
        _id: { $nin: [...user.likedProfiles, ...user.dislikedProfiles] }
    }).limit(1);
    res.json(profiles[0]);
};
