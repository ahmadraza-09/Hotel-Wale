const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');

const authRoutes = require('./routes/authroute');
const adminRoutes = require('./routes/admin-route');
const hotelRoutes = require('./routes/hotel-route');
const cityRoutes = require('./routes/cities-route');
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/hotel', hotelRoutes);
app.use('/city', cityRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
