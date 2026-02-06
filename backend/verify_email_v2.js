const mongoose = require('mongoose');
const User = require('./models/User');

const verifyEmail = async () => {
    console.log('Start V2...');
    const uri = "mongodb+srv://ajai17101999:b9DmfWPeF569qlxt@cluster0.i9lexj3.mongodb.net/Wealth_plus?retryWrites=true&w=majority&appName=Cluster0";

    try {
        console.log('Connecting...');
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected!');

        const email = 'ramasubramanianponni37@gmail.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log('FOUND:', user.email, user.phone);
        } else {
            console.log('NOT FOUND');
        }

    } catch (error) {
        console.error('ERR:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('Done.');
    }
};

verifyEmail();
