const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const verify = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('Connected');
        const projects = await Project.find({ title: { $in: ["Skyline Commercial Complex", "Green Valley Residencies"] } });
        console.log(`Found ${projects.length} projects`);
        projects.forEach(p => {
            console.log(`- ${p.title}`);
            console.log(`  Process: ${p.process?.length}, Benefits: ${p.benefits?.length}`);
            console.log(`  ServiceCategory: ${p.serviceCategory}, ServiceSubcategory: ${p.serviceSubcategory}`);
        });
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
verify();
