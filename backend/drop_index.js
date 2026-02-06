const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const db = mongoose.connection.db;
        const collection = db.collection('users');

        const indexes = await collection.indexes();
        console.log('Current Indexes:', indexes);

        const phoneIndex = indexes.find(idx => idx.name === 'phone_1');
        if (phoneIndex) {
            console.log('Found phone_1 index, dropping...');
            await collection.dropIndex('phone_1');
            console.log('phone_1 index dropped.');
        } else {
            console.log('phone_1 index not found.');
        }

        console.log('You can now restart the server.');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
