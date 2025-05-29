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
    db.query('SELECT id, name, stars, price_per_night, description, address, image, city_id, check_in_time, check_out_time, cancellation_policy, listed_by FROM hotels', [], (error, userData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": userData }));
        }
    })
}

exports.singlehotellist = (request, response) => {
    const id = { id: request.params.id };
    db.query('SELECT * FROM hotels WHERE ?', [id], (error, hotelData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": hotelData }));
        }
    })
}

exports.addhotel = async (request, response) => {
    const { name, stars, price_per_night, description, address, image, city_id, check_in_time, check_out_time, cancellation_policy, listed_by } = request.body;



    if (!name || !stars || !price_per_night || !description || !address || !city_id || !check_in_time || !check_out_time || !cancellation_policy) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'All fields are required' }));
    } else {
        db.query('INSERT INTO hotels SET ?', { name, stars, price_per_night, description, address, image, city_id, check_in_time, check_out_time, cancellation_policy, listed_by }, (error, hotelData) => {
            if (error) {
                response.send(JSON.stringify({ "status": 500, "error": error }));
            } else {
                response.send(JSON.stringify({ "status": 200, "error": null, "message": "Hotel Added Successfully", "hotel": hotelData, }));
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