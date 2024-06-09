const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoute = require('./routes/authRoute');
const eventRoute = require('./routes/eventRoute');
const path = require('path');
const https = require('https');
const app = express();
require('dotenv').config();


// Cookie and Static
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// Setup engine view
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'))

// Routes setup
app.use('/auth', authRoute);
app.use('/', eventRoute);


app.get('/login', (req, res) => {
    res.render('login', { message : null });
});

app.get('/register', (req, res) => {
    res.render('register');
});

const { handle404Error, handle500Error } = require('./middleware/errorHandlerMiddleware');
app.use(handle404Error);

if (app.get('env') === 'development'){
    app.use(handle500Error);

} else {
    app.use(handle500Error)
}

// Port setup
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server start on http://127.0.0.1:${PORT}`);
});