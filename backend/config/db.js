const mongoose = require('mongoose');

let cachedConnection = null;

const connectDB = async () => {
    if (cachedConnection && mongoose.connection.readyState === 1) {
        console.log('Using cached database connection');
        return cachedConnection;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4, // Force IPv4 to avoid ENOTFOUND errors on some networks
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        cachedConnection = conn;
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Don't use process.exit in serverless - just throw the error
        throw new Error(`Database connection failed: ${error.message}`);
    }
};

module.exports = connectDB;
