import mongoose from 'mongoose';

const PreferencesSchema = new mongoose.Schema({
  interest: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
  },
  smokingHabits: {
    type: String,
    required: true,
  },
  drinkingHabits: {
    type: String,
    required: true,
  },
  fitnessInterest: {
    type: String,
    required: true,
  },
  shortBio: {
    type: String,
    required: true,
  }
});

const UserDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  preferences: {
    type: PreferencesSchema,
    required: true,
  },
  photoUrls: {
    type: [String],
    required: false, 
  },
  videoUrl: {
    type: String,
    required: false, 
  }, 
  selectedGender: {
    type: String,
    required: false, 
  }
});

const UserDetails = mongoose.model('UserDetails', UserDetailsSchema);

export default UserDetails;
