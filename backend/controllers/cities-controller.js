const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.citieslist = (request, response) => {
    db.query('SELECT city_id, name, state, pincode FROM cities', [], (error, cityData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": cityData }));
        }
    })
}

exports.singlecitylist = (request, response) => {
    const city_id = { id: request.params.city_id };
    db.query('SELECT * FROM cities WHERE ?', [city_id], (error, cityData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": cityData }));
        }
    })
}

exports.addcity = async (request, response) => {
    const { name, state, pincode } = request.body;

    if (!name || !state || !pincode) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'All fields are required' }));
    } else {
        db.query('INSERT INTO cities SET ?', { name, state, pincode }, (error, cityData) => {
            if (error) {
                response.send(JSON.stringify({ "status": 500, "error": error }));
            } else {
                response.send(JSON.stringify({ "status": 200, "error": null, "message": "City Added Successfully", "hotel": cityData, }));
            }
        });
    }
}

exports.updatecity = (request, response) => {
    const city_id = request.params.city_id;

    db.query('UPDATE cities SET ? WHERE city_id = ?', [request.body, city_id], (error, cityData) => {
        if (error) {
            return response.status(500).send({ status: 500, error: error.message });
        }
        if (cityData.affectedRows === 0) {
            return response.status(404).send({ status: 404, message: "City not found or no changes made." });
        }
        return response.send({ status: 200, message: "City updated successfully" });
    });
};


exports.deletecity = (request, response) => {
    const city_id = request.params.city_id;

    db.query('DELETE FROM cities WHERE city_id = ?', [city_id], (error, cityData) => {
        if (error) {
            return response.status(500).send({ status: 500, error: error.message });
        }

        if (cityData.affectedRows === 0) {
            return response.status(404).send({ status: 404, message: "City not found" });
        }

        response.send({ status: 200, error: null, message: "City deleted successfully" });
    });
};