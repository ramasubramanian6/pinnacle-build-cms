const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

const checkUser = async () => {
    await connectDB();
    const User = require('./models/User');

    // The email from the logs
    const email = "ramasubramanianponni37@gmail.com";

    const user = await User.findOne({ email });

    if (user) {
        console.log(`User FOUND: ${user.email}`);
        console.log(`Role: ${user.role}`);
        console.log(`ID: ${user._id}`);
        // We won't print the password hash, but we confirm it exists
        console.log(`Password Hash exists: ${!!user.password}`);
    } else {
        console.log(`User NOT FOUND: ${email}`);
    }

    await mongoose.connection.close();
    process.exit(0);
};

checkUser();
