require('dotenv').config();

const handle404Error = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
}

const handle500Error = (err, req, res, next) => {
    if (!err.status) { err.message = 'Internal Server error'; err.status = 500 }

    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).render('error', {
        title: 'Error', 
        message: err.message, 
        statusCode : err.status,
        error: process.env.NODE_ENV === 'development' ? err : {},
        mode: process.env.NODE_ENV
    });
}

module.exports = {
    handle404Error,
    handle500Error
 }