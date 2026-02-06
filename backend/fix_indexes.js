const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);

        const db = mongoose.connection.db;
        const collection = db.collection('users');

        // List initial indexes
        let indexes = await collection.indexes();
        console.log('Initial Indexes:', indexes.map(i => i.name));

        const phoneIndex = indexes.find(idx => idx.name === 'phone_1');
        if (phoneIndex) {
            console.log('Found phone_1 index. Dropping it now...');
            try {
                await collection.dropIndex('phone_1');
                console.log('SUCCESS: phone_1 index dropped.');
            } catch (err) {
                console.error('FAILED to drop index:', err.message);
            }
        } else {
            console.log('phone_1 index NOT found. No action needed.');
        }

        // Verify result
        indexes = await collection.indexes();
        console.log('Final Indexes:', indexes.map(i => i.name));

        console.log('Done.');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();
