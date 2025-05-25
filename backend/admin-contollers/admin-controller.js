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