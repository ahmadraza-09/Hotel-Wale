const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const connectCloudinary = require('./configs/cloudinary');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // okay
const path = require('path');
connectCloudinary();

const authRoutes = require('./routes/authroute');
const adminRoutes = require('./routes/admin-route');
const hotelRoutes = require('./routes/hotel-route');
const cityRoutes = require('./routes/cities-route');
const hotelImageRoutes = require('./routes/hotel-images-route');
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/hotel', hotelRoutes);
app.use('/city', cityRoutes);
app.use('/image', hotelImageRoutes);

// MySQL DB Connection
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((error) => {
    if (error) {
        console.log(error.message);
    } else {
        console.log('✅ Connected to MySQL database.');
    }
})

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to HotelWale API');
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
