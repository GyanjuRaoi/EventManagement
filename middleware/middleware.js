const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if(err){ 
                return res.render('login', {message: 'Token expired login again'});
            } else {
                req.user = decoded;
                next();
            }

        });
    } else {
        return res.redirect('/login');
    }
}