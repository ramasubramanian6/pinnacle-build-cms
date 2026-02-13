const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ServiceCategory = require('./models/ServiceCategory');
const ServiceSubcategory = require('./models/ServiceSubcategory');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const listServices = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('Connected');

        const categories = await ServiceCategory.find();
        console.log('Categories:', categories.map(c => `${c.title} (${c.slug})`));

        const subcategories = await ServiceSubcategory.find();
        console.log('Subcategories:', subcategories.map(sc => `${sc.title} (${sc.slug})`));

        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};
listServices();
