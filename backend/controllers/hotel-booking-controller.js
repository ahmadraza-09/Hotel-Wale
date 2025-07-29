const mysql = require('mysql');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.hotelBooking = (req, res) => {
    const { check_in, check_out, room_type, number_of_guests, hotel_id, user_id } = req.body;

    // Assume user_id is retrieved from the logged-in user (middleware or JWT)
    // const user_id = req.user?.user_id; // Or from token/session

    if (!user_id || !check_in || !check_out || !room_type || !number_of_guests || !hotel_id) {
        return res.send(JSON.stringify({
            status: 400,
            error: "Missing Fields",
            message: 'All fields are required',
        }));
    }

    const bookingData = {
        user_id,
        hotel_id,
        check_in,
        check_out,
        room_type,
        number_of_guests,
        booking_status: 'pending'
    };

    db.query('INSERT INTO hotel_bookings SET ?', bookingData, (error, result) => {
        if (error) {
            return res.send(JSON.stringify({
                status: 500,
                error,
                message: "Booking failed"
            }));
        } else {
            res.send(JSON.stringify({ status: 200, message: "Booking successful", result }));
        }

    });
};

exports.getAllBookings = (req, res) => {
    const query = `
        SELECT 
            hotel_bookings.booking_id,
            hotel_bookings.check_in,
            hotel_bookings.check_out,
            hotel_bookings.room_type,
            hotel_bookings.number_of_guests,
            hotel_bookings.booking_status,
            users.user_id,
            users.full_name,
            hotels.id AS hotel_id,
            hotels.name AS hotel_name,
            hotel_bookings.created_at
        FROM hotel_bookings
        JOIN users ON hotel_bookings.user_id = users.user_id
        JOIN hotels ON hotel_bookings.hotel_id = hotels.id
        ORDER BY hotel_bookings.booking_id DESC
    `;

    db.query(query, (error, results) => {
        if (error) {
            return res.send(JSON.stringify({
                status: 500,
                error,
                message: "Failed to fetch bookings"
            }));
        }

        res.send(JSON.stringify({
            status: 200,
            message: "Bookings fetched successfully",
            data: results
        }));
    });
};

exports.getAllUserBookings = (req, res) => {
    const userId = req.params.user_id;

    const query = `
        SELECT 
            hotel_bookings.booking_id,
            hotel_bookings.check_in,
            hotel_bookings.check_out,
            hotel_bookings.room_type,
            hotel_bookings.number_of_guests,
            hotel_bookings.booking_status,
            users.user_id,
            users.full_name,
            hotels.id AS hotel_id,
            hotels.name AS hotel_name,
            hotel_bookings.created_at
        FROM hotel_bookings
        JOIN users ON hotel_bookings.user_id = users.user_id
        JOIN hotels ON hotel_bookings.hotel_id = hotels.id
        WHERE hotel_bookings.user_id = ?
        ORDER BY hotel_bookings.booking_id DESC
    `;

    db.query(query, [userId], (error, results) => {
        if (error) {
            return res.send(JSON.stringify({
                status: 500,
                error,
                message: "Failed to fetch bookings"
            }));
        }

        if (results.length === 0) {
            return res.send(JSON.stringify({ status: 200, message: 'No bookings found for this user', data: [] }));
        }

        res.send(JSON.stringify({
            status: 200,
            message: "User bookings fetched successfully",
            data: results
        }));
    });
};

exports.updateBookingStatus = (req, res) => {
    const bookingId = req.params.booking_id;
    const { booking_status } = req.body;

    console.log('Updating booking:', bookingId, 'to status:', booking_status);

    const query = `UPDATE hotel_bookings SET booking_status = ? WHERE booking_id = ?`;

    db.query(query, [booking_status, bookingId], (err, result) => {
        if (err) {
            console.error('Error updating booking status:', err);
            return res.send(JSON.stringify({ error: 'Database error' }));
        }

        res.send(JSON.stringify({ status: 200, message: 'Booking status updated successfully', booking_status: booking_status }));
    });
}