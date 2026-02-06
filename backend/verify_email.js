const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const verifyEmail = async () => {
    console.log('Connecting to MongoDB...');
    const uri = process.env.MONGODB_URI;
    console.log(`URI starts with: ${uri ? uri.substring(0, 20) : 'UNDEFINED'}...`);

    try {
        await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected to MongoDB.');

        const email = 'ramasubramanianponni37@gmail.com';
        console.log(`Checking for email: ${email}`);

        const user = await User.findOne({ email });

        if (user) {
            console.log('--------------------------------------------------');
            console.log('✅ USER FOUND');
            console.log(`ID: ${user._id}`);
            console.log(`Email: ${user.email}`);
            console.log(`Phone: ${user.phone || 'N/A'}`);
            console.log(`Role: ${user.role}`);
            console.log('--------------------------------------------------');
        } else {
            console.log('--------------------------------------------------');
            console.log('❌ USER NOT FOUND');
            console.log(`Email '${email}' is not in the database.`);
            console.log('--------------------------------------------------');
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Connection closed.');
        process.exit(0);
    }
};

verifyEmail();
