const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.getimages = (req, res) => {
    const hotel_id = req.params.hotel_id;

    try {
        db.query("SELECT * FROM hotels WHERE id = ?", [hotel_id], (err1, hotelData) => {
            if (err1) {
                return res.status(500).json({ status: 500, error: err1.message, message: 'Database error' });
            }

            if (hotelData.length === 0) {
                return res.status(404).json({ status: 404, error: "Invalid hotel_id", message: 'Hotel not found' });
            }

            db.query("SELECT * FROM hotel_images WHERE hotel_id = ?", [hotel_id], (err2, imageData) => {
                if (err2) {
                    return res.status(500).json({ status: 500, error: err2.message, message: 'Error fetching images' });
                }

                res.status(200).json({ status: 200, error: '', message: imageData });
            });
        });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message, message: "Server error" });
    }
};


exports.uploadImages = (req, res) => {
    const hotel_id = req.params.hotel_id;
    const imageUrls = req.body.imageUrls;

    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
        return res.status(400).json({ error: "No image URLs provided" });
    }

    const values = imageUrls.map((url, index) => [hotel_id, url, index === 0 ? 1 : 0]);

    const sql = "INSERT INTO hotel_images (hotel_id, image_url, isPrimary) VALUES ?";

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