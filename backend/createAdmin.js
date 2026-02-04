const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminEmail = 'admin@brixxspace.com';
        const adminPassword = 'admin123'; // Default password

        const userExists = await User.findOne({ email: adminEmail });

        if (userExists) {
            console.log('Admin user already exists');
        } else {
            const user = await User.create({
                fullName: 'Admin User',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
            });
            console.log(`Admin user created: ${user.email} / ${adminPassword}`);
        }

        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

createAdmin();
