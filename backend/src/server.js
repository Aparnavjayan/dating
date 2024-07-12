import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import path from 'path';
import { Server as SocketIoServer } from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import routes from './routes/auth-route.js';
import verifyRoutes from './routes/verify-route.js';
import datasends from './routes/datasending-route.js';
import empdata from './routes/employmentdata.js';
import relationdata from './routes/relationtype.js';
import userDetailsRoute from './routes/userdetails-route.js';
import filesRouter from './routes/media-route.js';
import fetechedData from './routes/datafetching-route.js';
import userDataRoutes from './routes/user-route.js';
import loginRoute from './routes/login-route.js';
import actionRoute from './routes/action-route.js';
import messageRoute from './routes/message-route.js';
import Message from '../database/Message.js';
import requestAndShort from './routes/requestAndShort-route.js';
import editProfile from './routes/editprofile-route.js';

import './middleware/passport.js'; 

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIoServer(server);

export { io };



mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB...', err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const corsOptions = {
  origin: 'http://localhost:3000', 
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 
    }
  }));



  app.use(passport.initialize());
  app.use(passport.session());
  app.use(bodyParser.json());
  app.use(cookieParser());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  app.use(routes);
  app.use(verifyRoutes);
  app.use(datasends);
  app.use(empdata);
  app.use(relationdata);
  app.use(userDetailsRoute);
  app.use('/api/files', filesRouter); 
  app.use(fetechedData);
  app.use(userDataRoutes);
  app.use(loginRoute);
  app.use('/api',actionRoute);
  app.use('/api', messageRoute);
  app.use(requestAndShort);
  app.use('/api',editProfile)

  

  io.on('connection', (socket) => {
    console.log('New client connected');
    
    socket.on('join', (userId) => {
      socket.join(userId);
      console.log(`User joined room: ${userId}`);
    });
    
    socket.on('sendMessage', async (messageData) => {
      const { sender, receiver, content } = messageData;
      const message = new Message({ sender, receiver, content });
      await message.save();
      io.to(receiver).emit('receiveMessage', message);
      io.to(sender).emit('receiveMessage', message);
    });
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });


 
  app.get('*', (req, res) => {
  
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
   
  });  

app.listen(3000, () => console.log('Server started on port 3000'));
