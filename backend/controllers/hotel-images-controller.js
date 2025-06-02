const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.getimages = async (req, res) => {
    const hotelId = req.params.hotelId;
    try {
        const [rows] = await db.query(
            "SELECT * FROM hotel_images WHERE hotel_id = ?",
            [hotelId]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error fetching images" });
    }
};

exports.addimage = async (req, res) => {
    const { hotel_id, image_url } = req.body;
    try {
        await db.query(
            "INSERT INTO hotel_images (hotel_id, image_url) VALUES (?, ?)",
            [hotel_id, image_url]
        );
        res.json({ message: "Image added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding image" });
    }
};

exports.deleteimage = async (req, res) => {
    const imageId = req.params.id;
    try {
        await db.query("DELETE FROM hotel_images WHERE id = ?", [imageId]);
        res.json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting image" });
    }
};