const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

exports.register = (req, res) => {
    const { username, password } = req.body;
    const userExist = User.getUserByUsername(username);

    if (userExist) {
        return res.render('register',{ message: 'User already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    const userData = {
        id: uuidv4(),
        username,
        password: hashedPassword
    };

    User.createUser(userData);
    res.redirect('/login');
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = User.getUserByUsername(username);
    if (!user) {
        return res.render('login', { message: 'User not found' });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
        return res.render('login', { message: 'Invalid password' });
    }
    const token = jwt.sign({ id: user.id,  username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.cookie('token', token);
    res.header('authorization', token);
    res.redirect('/');
};

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
