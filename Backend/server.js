const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointment', appointmentRoutes);

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);



const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
