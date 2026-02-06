const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);

    console.error('Error:', err.message);

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        res.status(400).json({
            message,
            stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        });
        return;
    }

    if (process.env.NODE_ENV !== 'production') {
        console.error('Stack:', err.stack);
    }

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler };
