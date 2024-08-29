const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/DbConfig'); 


connectDB();

app.use(express.json());
app.use(cors());

const reviewRoutes = require('./routes/Review_routs'); // Correct path to review routes
app.use('/api/reviews', reviewRoutes);


const port = process.env.PORT || 8070;
app.listen(port, () => console.log(`Nodemon server started at port ${port}` ));