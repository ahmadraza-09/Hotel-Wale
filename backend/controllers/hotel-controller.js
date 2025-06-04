const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.hotelslist = (request, response) => {
    db.query(
        `SELECT 
            h.id, h.name, h.stars, h.price_per_night, h.taxes_and_fees, h.description, h.address,
            h.city_id, h.check_in_time, h.check_out_time, h.cancellation_policy, 
            h.listed_by, a.full_name AS listed_by_name, c.name AS city_name,
            GROUP_CONCAT(i.image_url) AS images
        FROM hotels h
        LEFT JOIN admins a ON h.listed_by = a.id
        LEFT JOIN cities c ON h.city_id = c.city_id
        LEFT JOIN hotel_images i ON h.id = i.hotel_id
        GROUP BY h.id`,
        [],
        (error, userData) => {
            if (error) {
                response.send(JSON.stringify({ status: '404', error }));
            } else {
                // Convert comma-separated images string to array for each hotel
                const hotelsWithImages = userData.map(hotel => ({
                    ...hotel,
                    images: hotel.images ? hotel.images.split(',') : []
                }));
                response.send(JSON.stringify({ status: '200', error: '', message: hotelsWithImages }));
            }
        }
    );
};


exports.hotelslistbyid = (request, response) => {
    const user_id = request.params.user_id;

    db.query(
        `SELECT 
            h.id, h.name, h.stars, h.price_per_night, h.taxes_and_fees, h.description, h.address,
            h.city_id, h.check_in_time, h.check_out_time, h.cancellation_policy, 
            h.listed_by, a.full_name AS listed_by_name, c.name AS city_name
        FROM hotels h
        LEFT JOIN admins a ON h.listed_by = a.id
        LEFT JOIN cities c ON h.city_id = c.city_id
        WHERE h.listed_by = ?`,
        [user_id],
        (error, hotelData) => {
            if (error) {
                response.send(JSON.stringify({ "status": '404', "error": error }));
            } else {
                response.send(JSON.stringify({ "status": '200', "error": '', "message": hotelData }));
            }
        }
    );
};

exports.recentlyaddedhotelsbyid = (request, response) => {
    const user_id = request.params.user_id;

    db.query(
        `SELECT 
            h.id, h.name, h.stars, h.price_per_night, h.taxes_and_fees, h.description, h.address,
            h.city_id, h.check_in_time, h.check_out_time, h.cancellation_policy, 
            h.listed_by, a.full_name AS listed_by_name, c.name AS city_name
        FROM hotels h
        LEFT JOIN admins a ON h.listed_by = a.id
        LEFT JOIN cities c ON h.city_id = c.city_id
        WHERE h.listed_by = ?
        ORDER BY h.id DESC
        LIMIT 5`,
        [user_id],
        (error, hotelData) => {
            if (error) {
                response.send(JSON.stringify({ status: '404', error: error }));
            } else {
                response.send(JSON.stringify({ status: '200', error: '', message: hotelData }));
            }
        }
    );
};


exports.hotelslistcountbyid = (request, response) => {
    const user_id = request.params.user_id;

    db.query(
        `SELECT COUNT(*) AS hotel_count FROM hotels WHERE listed_by = ?`,
        [user_id],
        (error, result) => {
            if (error) {
                response.send(JSON.stringify({ status: '404', error: error }));
            } else {
                const count = result[0].hotel_count;
                response.send(JSON.stringify({ status: '200', error: '', count: count }));
            }
        }
    );
};


exports.singlehotellist = (request, response) => {
    const id = request.params.id;

    const sql = `
        SELECT 
            h.id, h.name, h.stars, h.price_per_night, h.taxes_and_fees, h.description, h.address,
            h.city_id, h.check_in_time, h.check_out_time, h.cancellation_policy, 
            h.listed_by, a.full_name AS listed_by_name, c.name AS city_name,
            GROUP_CONCAT(i.image_url) AS images
        FROM hotels h
        LEFT JOIN admins a ON h.listed_by = a.id
        LEFT JOIN cities c ON h.city_id = c.city_id
        LEFT JOIN hotel_images i ON h.id = i.hotel_id
        WHERE h.id = ?
        GROUP BY h.id
    `;

    db.query(sql, [id], (error, hotelData) => {
        if (error) {
            return response.status(500).json({ status: '500', error: 'Database error', details: error });
        }

        if (hotelData.length === 0) {
            return response.status(404).json({ status: '404', error: 'Hotel not found' });
        }

        const hotel = hotelData[0];

        const formattedHotel = {
            ...hotel,
            images: hotel.images ? hotel.images.split(',') : []
        };

        response.status(200).json({ status: '200', error: '', message: formattedHotel });
    });
};


exports.addhotel = async (request, response) => {
    const { name, stars, price_per_night, taxes_and_fees, description, address, city_id, check_in_time, check_out_time, cancellation_policy, listed_by } = request.body;

    if (!name || !stars || !price_per_night || !taxes_and_fees || !description || !address || !city_id || !check_in_time || !check_out_time || !cancellation_policy) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'All fields are required' }));
    } else {
        db.query('INSERT INTO hotels SET ?', { name, stars, price_per_night, taxes_and_fees, description, address, city_id, check_in_time, check_out_time, cancellation_policy, listed_by }, (error, hotelData) => {
            if (error) {
                response.send(JSON.stringify({ "status": 500, "error": error }));
            } else {
                const newHotel = {
                    hotel_id: hotelData.insertId,
                    name,
                    address,
                };
                response.send(JSON.stringify({ "status": 200, "error": null, "message": "Hotel Added Successfully", "hotel": newHotel }));
            }
        });
    }
}

exports.updatehotel = (request, response) => {
    const id = request.params.id;

    db.query('UPDATE hotels SET ? WHERE id = ?', [request.body, id], (error, hotelData) => {
        if (error) {
            return response.status(500).send({ status: 500, error: error.message });
        }
        if (hotelData.affectedRows === 0) {
            return response.status(404).send({ status: 404, message: "Hotel not found or no changes made." });
        }
        return response.send({ status: 200, message: "Hotel updated successfully" });
    });
};


exports.deletehotel = (request, response) => {
    const id = request.params.id;

    db.query('DELETE FROM hotels WHERE id = ?', [id], (error, hotelData) => {
        if (error) {
            return response.status(500).send({ status: 500, error: error.message });
        }

        if (hotelData.affectedRows === 0) {
            return response.status(404).send({ status: 404, message: "Admin not found" });
        }

        response.send({ status: 200, error: null, message: "Hotel deleted successfully" });
    });
};