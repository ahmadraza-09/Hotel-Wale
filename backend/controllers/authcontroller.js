const mysql = require('mysql');
const md5 = require('md5')
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.userlist = (request, response) => {
    db.query('SELECT id, full_name, email, phone, FROM users', [], (error, userData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": userData }));
        }
    })
}

exports.singleuserlist = (request, response) => {
    const userId = { user_id: request.params.user_id };
    db.query('SELECT * FROM users WHERE ?', [userId], (error, userData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": userData }));
        }
    })
}

exports.registration = async (request, response) => {
    const { full_name, email, phone, password } = request.body;
    let hashpassword = await md5(password)
    // console.log(hashpassword);
    db.query('select * from users where email= ?', [email], (error, userData) => {

        if (userData != '') {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": "Email already exists" }));
        } else {
            db.query('SELECT * FROM users WHERE phone = ?', [phone], (error, userData) => {
                if (userData != '') {
                    response.send(JSON.stringify({ "status": 200, "error": null, "message": "Mobile Number already exists" }));
                } else {
                    db.query('INSERT INTO users SET ?', { full_name: full_name, email: email, phone: phone, password: hashpassword }, (error, userData) => {
                        if (error) {
                            response.send(JSON.stringify({ "status": 500, "error": error }));
                        } else {
                            const newUser = {
                                user_id: userData.insertId,
                                full_name,
                                email,
                                phone
                            };
                            const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                            response.send(JSON.stringify({ "status": 200, "error": null, "message": "Registered Successfully", "user": newUser, "token": token }));
                        }
                    });
                }
            });
        }

    })

}

exports.login = (request, response) => {
    const { identifier, password } = request.body;

    if (!identifier || !password) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'Mobile number/email and password are required' }));
    }

    const hashedPassword = md5(password);

    db.query('SELECT * FROM users WHERE (phone = ? OR email = ?) AND password = ?', [identifier, identifier, hashedPassword], (error, userData) => {
        if (error) {
            return response.send(JSON.stringify({ "status": 500, "error": error, "message": 'Internal server error' }));
        }
        if (userData.length === 0) {
            return response.send(JSON.stringify({ "status": 401, "error": "Invalid Credentials", "message": 'Invalid mobile number/email or password' }));
        }
        const token = jwt.sign({ userId: userData[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.send(JSON.stringify({ "status": 200, "error": null, "message": 'Login successfully', "user": userData[0], "token": token }));
    });
};

exports.updateuser = (request, response) => {
    const user_id = request.params.user_id;
    const { email, phone } = request.body;

    db.query('SELECT * FROM users WHERE(email = ? OR phone = ?) AND user_id != ? ', [email, phone, user_id], (err, userData) => {
        if (err) {
            return response.status(500).send({ status: 500, error: err.message });
        }

        if (userData.length > 0) {
            const existing = userData[0];
            if (existing.email === email && existing.phone === phone) {
                return response.send({ status: 409, message: "Email and Mobile Number already exist" });
            } else if (existing.email === email) {
                return response.send({ status: 409, message: "Email already exists" });
            } else if (existing.phone === phone || existing.phone == phone) {
                return response.send({ status: 409, message: "Mobile Number already exists" });
            }
        }

        db.query('update users set ? where user_id= ?', [request.body, user_id], (error, userData) => {
            if (error) {
                response.send(JSON.stringify({ "status": 200, "error": null }))
            } else {
                response.send(JSON.stringify({ "status": 200, "error": null, "message": userData }))
            }
        })
    })
}

exports.deleteuser = (request, response) => {
    const user_id = request.params.user_id;

    db.query('DELETE FROM users WHERE user_id = ?', [user_id], (error, result) => {
        if (error) {
            return response.status(500).send({ status: 500, error: error.message });
        }

        if (result.affectedRows === 0) {
            return response.status(404).send({ status: 404, message: "User not found" });
        }

        response.send({ status: 200, error: null, message: "User deleted successfully" });
    });
};


exports.uploadProfile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image uploaded" });
    }

    const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    const user_id = req.params.user_id;

    db.query(
        "UPDATE users SET profile_image = ? WHERE user_id = ?",
        [imageUrl, user_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
            res.status(200).json({ message: "Image uploaded", imageUrl });
        }
    );
};
