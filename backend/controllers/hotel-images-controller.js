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

exports.uploadImages = (req, res) => {
    const hotel_id = req.params.hotel_id;
    const imageUrls = req.body.imageUrls; // Array from frontend

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        return res.status(400).json({ error: "No image URLs provided" });
    }

    const values = imageUrls.map((url) => [hotel_id, url]);
    const sql = "INSERT INTO hotel_images (hotel_id, image_url) VALUES ?";

    db.query(sql, [values], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Error saving to DB" });
        }
        res.status(200).json({ message: "Images uploaded", urls: imageUrls });
    });
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