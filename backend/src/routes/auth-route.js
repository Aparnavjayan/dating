import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../../database/User.js'
import '../middleware/passport.js'
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();



router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));
 
  router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/signup' }),
    async function(req, res) {
      try {
        const user = await User.findById(req.user._id);
        if (!user) {
          return res.redirect('/signup');
        }
  
        // Create a new session for the user
        req.session.regenerate((err) => {
          if (err) {
            console.error('Error regenerating session:', err);
            return res.redirect('/signup');
          }
  
          const token = jwt.sign({ userid: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
          if (!token) {
            return res.status(404).json({ message: 'Token not found' });
          }
  
          res.cookie('jwt', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            path: '/'
          });
          res.cookie('userid', user._id.toString(), { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            path: '/'
          });
          
          req.session.user = user;
          res.redirect('/register');
        });
      } catch (error) {
        console.error(error);
        res.redirect('/signup');
      }
    });
  
  

  export default router;
