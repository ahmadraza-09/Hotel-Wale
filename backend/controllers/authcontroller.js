const mysql = require('mysql');
const md5 = require('md5')
const jwt = require('jsonwebtoken');

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