import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
      type: String,
      unique: true,
      sparse: true
    },
   
   name: String,
    email: {
      type: String,
      unique: true,
      sparse: true 
    },  
    phone: {
      type: String,
      unique: true,
      sparse: true 
      },
      password: {
        type: String,
        },
        userType: String,
        companyName: String,
        designation: String,
        location: String,
        expertiseLevel: String,
        relationshipType: String,
        userDetails: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails' },
          
        
    
  });

const User = mongoose.model('User', userSchema);

export default User;
