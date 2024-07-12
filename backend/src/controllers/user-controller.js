import User from '../../database/User.js';
import UserDetails from '../../database/UserDetails.js';
import HiddenProfile from '../../database/HiddenProfiles.js';
import ShortList from '../../database/ShortList.js';

export const getProfiles = async (req, res) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const loggedInUserDetails = await UserDetails.findOne({ userId });

        if (!loggedInUserDetails) {
            return res.status(404).json({ error: 'User details not found' });
        }

        const hiddenProfileDoc = await HiddenProfile.findOne({ userId });
        const hiddenProfiles = hiddenProfileDoc ? hiddenProfileDoc.hiddenProfilesIds : [];

        const query = {
            userId: { $ne: userId, $nin: hiddenProfiles },
            gender: { $ne: loggedInUserDetails.selectedGender }  // Filter by selected gender
        };

        const fetchRandomProfiles = async (matchCriteria) => {
            return await UserDetails.aggregate([
                { $match: { ...matchCriteria, ...query } },
                { $sample: { size: 10 } }  // Fetch random 10 profiles
            ]);
        };

        const qualificationProfiles = await fetchRandomProfiles({ education: loggedInUserDetails.education });
        const occupationProfiles = await fetchRandomProfiles({ occupation: loggedInUserDetails.occupation });
        const locationProfiles = await fetchRandomProfiles({ location: loggedInUserDetails.location });

        // Function to populate user details
        const populateUserDetails = async (profiles) => {
            return await UserDetails.populate(profiles, { path: 'userId', select: 'name' });
        };

        const populatedQualificationProfiles = await populateUserDetails(qualificationProfiles);
        const populatedOccupationProfiles = await populateUserDetails(occupationProfiles);
        const populatedLocationProfiles = await populateUserDetails(locationProfiles);

        res.json({
            qualificationProfiles: populatedQualificationProfiles,
            occupationProfiles: populatedOccupationProfiles,
            locationProfiles: populatedLocationProfiles
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

        
        await ShortList.findOneAndUpdate(
            { userId },
            { $addToSet: { shortListedIds: profileId } },
            { upsert: true, new: true }
        );

        
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

       
        await HiddenProfile.findOneAndUpdate(
            { userId },
            { $addToSet: { hiddenProfilesIds: profileId } },
            { upsert: true, new: true }
        );

       
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
