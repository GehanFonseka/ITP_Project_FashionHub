const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const sneakersRoutes = require('./routes/sneakersRoutes');
const officeShoesRoutes = require('./routes/OfficeshoesRoutes');
const bootsRoutes = require('./routes/BootsRoutes');
const chainsAndBraceletsRoutes = require('./routes/ChainsandBraceletsRoutes');
const reportRoutes = require('./routes/footwearRoutes');
  


app.use('/api/sneakers', sneakersRoutes);
app.use('/api/officeshoes', officeShoesRoutes);
app.use('/api/boots', bootsRoutes);
app.use('/api/chainsandbracelets', chainsAndBraceletsRoutes);
app.use('/api/report', reportRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointment', appointmentRoutes);

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);

const reportRoutes1 = require("./routes/reportRoutes1"); // Import reportRoutes
app.use("/api/reports", reportRoutes1); // Use the reportRoutes for the /api/reports endpoint

const orderRoutes = require("./routes/orderRoutes"); // Import orderRoutes
app.use("/api/orders", orderRoutes); // Use the orderRoutes for the /api/orders endpoint

const incomeRoute = require("./routes/incomeRoute"); // Import incomeRoute
app.use("/api/income", incomeRoute); // Use the incomeRoute for the /api/income endpoint

const reviewRoutes = require('./routes/Review_routs'); // Correct path to review routes
app.use('/api/reviews', reviewRoutes);


const items = require('./routes/items.route');
app.use('/api/items', items);


const ticketRoutes = require("./routes/ticketRoute"); // Import ticketRoutes
app.use("/api/tickets", ticketRoutes); // Use the ticketRoutes for the /api/tickets endpoint


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use other routes
const pantsRoutes = require('./routes/pantsRoutes');
const tmMensBlazerRoutes = require('./routes/TMMensBlazerRoutes');
const rmMensBlazerRoutes = require('./routes/RMMensBlazerRoutes');
const WCTshirtRoutes = require('./routes/WCTshirtRoutes');
const TMWomensTrouserRoutes = require('./routes/TMWomensTrouserRoutes');
const clothingRoutes = require('./routes/clothingRoutes'); 

// Use the user routes
const userRoutes = require('./routes/userRoutes'); // Import the user routes
app.use('/api/user', userRoutes); // Add this line for user routes

app.use('/api/pants', pantsRoutes);
app.use('/api/tm-mensblazers', tmMensBlazerRoutes);
app.use('/api/rm-mensblazers', rmMensBlazerRoutes);
app.use('/api/wc-tshirts', WCTshirtRoutes);
app.use('/api/tm-womenstrousers', TMWomensTrouserRoutes);
app.use('/api/clothing', clothingRoutes); 


const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const favoriteRoutes = require("./routes/favoritePackages"); // Assuming you have this route





app.get("/", (req, res) => res.send("Hello server is running.."));
app.use("/api/favoritePackages", favoriteRoutes); // Add your favorite packages route



