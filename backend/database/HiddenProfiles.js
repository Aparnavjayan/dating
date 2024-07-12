import mongoose from 'mongoose';

const hiddenProfileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    hiddenProfilesIds:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      }],
 
})


const HiddenProfile = mongoose.model('HiddenProfile', hiddenProfileSchema);
export default HiddenProfile;