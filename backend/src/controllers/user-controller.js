import User from '../../database/User.js';
import UserDetails from '../../database/UserDetails.js';
import HiddenProfile from '../../database/HiddenProfiles.js';
import ShortList from '../../database/ShortList.js';

export const getProfiles = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('Logged-in user ID:', userId);

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const loggedInUser = await User.findOne({ _id: userId });
        console.log('Logged-in user:', loggedInUser);

        if (!loggedInUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const loggedInUserDetails = await UserDetails.findOne({ userId });
        console.log('Logged-in user details:', loggedInUserDetails);

        if (!loggedInUserDetails) {
            return res.status(404).json({ error: 'User details not found' });
        }

        const hiddenProfileDoc = await HiddenProfile.findOne({ userId });
        const hiddenProfiles = hiddenProfileDoc ? hiddenProfileDoc.hiddenProfilesIds : [];
        console.log('Hidden profiles:', hiddenProfiles);

        const query = {
            userId: { $ne: userId, $nin: hiddenProfiles }
        };

        const qualificationProfiles = await UserDetails.find({
            education: loggedInUserDetails.education,
            ...query
        }).populate('userId').exec();

        const occupationProfiles = await UserDetails.find({
            occupation: loggedInUserDetails.occupation,
            ...query
        }).populate('userId').exec();

        const locationProfiles = await UserDetails.find({
            location: loggedInUserDetails.location,
            ...query
        }).populate('userId').exec();

        console.log('Qualification profiles:', qualificationProfiles);
        console.log('Occupation profiles:', occupationProfiles);
        console.log('Location profiles:', locationProfiles);

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
    try {
        const userId = req.user._id;
        console.log('logged in user',userId)
        const { profileId } = req.params;
        console.log('otheruser', profileId)

        // Add profile to the user's shortlist
        await ShortList.findOneAndUpdate(
            { userId },
            { $addToSet: { shortListedIds: profileId } },
            { upsert: true, new: true }
        );

        // Remove profile from hidden profiles if present
        await HiddenProfile.findOneAndUpdate(
            { userId },
            { $pull: { hiddenProfilesIds: profileId } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error liking profile:', error);
        res.status(500).json({ error: 'Error liking profile' });
    }
};

export const dislikeProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        console.log('logged in user',userId)
        const { profileId } = req.params;
        console.log('otheruser', profileId)

        // Add profile to the user's hidden profiles
        await HiddenProfile.findOneAndUpdate(
            { userId },
            { $addToSet: { hiddenProfilesIds: profileId } },
            { upsert: true, new: true }
        );

        // Remove profile from shortlisted profiles if present
        await ShortList.findOneAndUpdate(
            { userId },
            { $pull: { shortListedIds: profileId } }
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error disliking profile:', error);
        res.status(500).json({ error: 'Error disliking profile' });
    }
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
