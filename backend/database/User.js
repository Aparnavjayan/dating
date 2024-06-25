import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
      type: String,
      required: true,
      unique: true
    },
   
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    image: String,
    email: {
      type: String,
      required: false,
      unique: true
    },  
    phoneNumber: {
      type: String,
      unique: true,
      required:false
      
    },
    otp: String,
    otpExpiry: Date
  });

const User = mongoose.model('User', userSchema);

export default User;
