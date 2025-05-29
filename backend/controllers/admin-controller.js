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

exports.adminlist = (request, response) => {
    db.query('SELECT id, full_name, email, phone FROM admins', [], (error, userData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": userData }));
        }
    })
}

exports.singleadminlist = (request, response) => {
    const id = { id: request.params.id };
    db.query('SELECT * FROM admins WHERE ?', [id], (error, userData) => {
        if (error) {
            response.send(JSON.stringify({ "status": '404', "error": error }));
        } else {
            response.send(JSON.stringify({ "status": '200', "error": '', "message": userData }));
        }
    })
}

exports.superadmin = async (request, response) => {
    const { full_name, email, phone, role, password } = request.body;
    const hashpassword = await bcrypt.hash(password, 10);
    // console.log(hashpassword);
    db.query('select * from admins where email= ?', [email], (error, userData) => {

        if (userData != '') {
            response.send(JSON.stringify({ "status": 200, "error": null, "message": "Email already exists" }));
        } else {
            db.query('SELECT * FROM admins WHERE phone = ?', [phone], (error, userData) => {
                if (userData != '') {
                    response.send(JSON.stringify({ "status": 200, "error": null, "message": "Mobile Number already exists" }));
                } else {
                    db.query('INSERT INTO admins SET ?', { full_name: full_name, email: email, phone: phone, role: role, password: hashpassword }, (error, userData) => {
                        if (error) {
                            response.send(JSON.stringify({ "status": 500, "error": error }));
                        } else {
                            const newUser = {
                                user_id: userData.insertId,
                                full_name,
                                email,
                                phone,
                                // role
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

exports.adminlogin = (request, response) => {
    const { identifier, password } = request.body;

    if (!identifier || !password) {
        return response.send(JSON.stringify({ "status": 400, "error": "Missing Fields", "message": 'Mobile number/email and password are required' }));
    }

    db.query('SELECT * FROM admins WHERE phone = ? OR email = ?', [identifier, identifier], async (error, userData) => {
        if (error) {
            return response.send(JSON.stringify({ "status": 500, "error": error, "message": 'Internal server error' }));
        }
        if (userData.length === 0) {
            return response.send(JSON.stringify({ "status": 401, "error": "Invalid Credentials", "message": 'Invalid mobile number/email or password' }));
        }

        const user = userData[0];

        // Compare input password with hashed password stored
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return response.status(401).send({ status: 401, error: "Invalid Credentials", message: 'Invalid mobile number/email or password' });
        }

        const token = jwt.sign({ userId: userData[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        response.send(JSON.stringify({ "status": 200, "error": null, "message": 'Login successfully', "user": userData[0], "token": token }));
    });
};

exports.hoteladmin = async (request, response) => {
    const { full_name, email, phone, password } = request.body;
    const hashpassword = await bcrypt.hash(password, 10);

    db.query('SELECT * FROM admins WHERE email = ?', [email], (error, userData) => {
        if (userData.length > 0) {
            response.send({ status: 200, message: "Email already exists" });
        } else {
            db.query('SELECT * FROM admins WHERE phone = ?', [phone], (error, userData) => {
                if (userData.length > 0) {
                    response.send({ status: 200, message: "Mobile Number already exists" });
                } else {
                    const hotel_id = `HTL-${uuidv4().slice(0, 8)}`;
                    db.query('INSERT INTO admins SET ?', { full_name, email, phone, role: 'hoteladmin', password: hashpassword, hotel_id },
                        (error, result) => {
                            if (error) {
                                response.send({ status: 500, error });
                            } else {
                                const newUser = {
                                    user_id: result.insertId,
                                    full_name,
                                    email,
                                    phone,
                                    // role: 'hoteladmin',
                                    hotel_id,
                                };
                                const token = jwt.sign({ userId: newUser.user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                                response.send({ status: 200, message: "Registered Successfully", user: newUser, token });
                            }
                        }
                    );
                }
            });
        }
    });
};

exports.updateadmin = (request, response) => {
    const id = request.params.id;
    const { email, phone } = request.body;

    db.query('SELECT * FROM admins WHERE(email = ? OR phone = ?) AND id != ? ', [email, phone, id], (err, userData) => {
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

        db.query('update admins set ? where id= ?', [request.body, id], (error, userData) => {
            if (error) {
                return response.status(500).send({ status: 500, error: error.message });
            } else if (userData.affectedRows === 0) {
                return response.status(404).send({ status: 404, message: "Admin not found or no changes made." });
            } else {
                response.send(JSON.stringify({ "status": 200, "error": null, "message": userData }))
            }
        })
    })
}

exports.deleteadmin = (request, response) => {
    const id = request.params.id;

    db.query('DELETE FROM admins WHERE user_id = ?', [id], (error, adminData) => {
        if (error) {
            return response.status(500).send({ status: 500, error: error.message });
        }

        if (adminData.affectedRows === 0) {
            return response.status(404).send({ status: 404, message: "Admin not found" });
        }

        response.send({ status: 200, error: null, message: "Admin deleted successfully" });
    });
};