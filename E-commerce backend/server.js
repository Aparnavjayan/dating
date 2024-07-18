import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import productRoutes from './routes/addProducts.js';
import userData from '../backend/src/routes/datafetching-route.js'

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
 .catch(err => console.error('Could not connect to MongoDB...', err));


 app.use('/api/products', productRoutes);
 app.use(userData);

app.listen(3001, () => console.log('Server started on port 3001'));