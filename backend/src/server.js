import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes/auth-route.js';
import verifyRoutes from './routes/verify-route.js';
import datasends from './routes/datasending-route.js'

import './middleware/passport.js'; 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({
    origin:"*",
}
));

app.use(bodyParser.json())

app.use(express.static('public'));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
app.use('/verify', verifyRoutes);
app.use('/api/register',datasends)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(3000, () => console.log('Server started on port 3000'));
