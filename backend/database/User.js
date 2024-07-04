import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId: {
      type: String,
      unique: true
    },
   
   name: String,
    email: {
      type: String,
      unique: true
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
          
        
    
  });

const User = mongoose.model('User', userSchema);

export default User;
