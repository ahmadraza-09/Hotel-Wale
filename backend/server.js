const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authroute');
app.use('/auth', authRoutes);

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

app.get('/userlist', (req, res) => {
    const sql = 'SELECT * FROM users'; // Make sure your table name is `users`
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
});

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
