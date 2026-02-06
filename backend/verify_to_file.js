const mongoose = require('mongoose');
const User = require('./models/User');
const fs = require('fs');

const verifyEmail = async () => {
    const uri = "mongodb+srv://ajai17101999:b9DmfWPeF569qlxt@cluster0.i9lexj3.mongodb.net/Wealth_plus?retryWrites=true&w=majority&appName=Cluster0";

    try {
        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });

        const email = 'ramasubramanianponni37@gmail.com';
        const user = await User.findOne({ email });

        let output = '';
        if (user) {
            output = `USER FOUND: ${user.email} (ID: ${user._id})`;
        } else {
            output = `USER NOT FOUND: ${email}`;
        }

        fs.writeFileSync('verification_result.txt', output);

    } catch (error) {
        fs.writeFileSync('verification_result.txt', `ERROR: ${error.message}`);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

verifyEmail();
