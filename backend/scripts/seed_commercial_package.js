const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('../models/Package');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedCommercialPackage = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('MongoDB Connected');

        const commercialPackage = {
            title: "Commercial Construction",
            price: "Contact for Pricing",
            description: "State-of-the-art commercial building solutions designed for modern businesses. From office complexes to retail spaces, we deliver high-quality construction that meets your specific operational needs.",
            features: [
                "2 BHK equivalent workspace",
                "Panoramic Lake View",
                "Modern Architecture",
                "Sustainable Design",
                "High-speed Connectivity",
                "Premium Interiors"
            ],
            details: "When it comes to building your dream commercial space, it’s important to work with custom builders who understand your vision and can bring it to life. Pinnacle Build experts have the knowledge and experience to create a workspace that is truly personalized to your unique style and needs. We focus on maximizing space utility while ensuring specific aesthetic appeal.",
            images: [
                "/images/services/commercial-side-view.jpg",
                "/images/services/commercial-front.jpg"
            ],
            featuresDescription: "Our commercial construction packages are designed to deliver exceptional value, combining functional excellence with striking design.",
            process: [
                { title: "Consultation", description: "In-depth requirement analysis" },
                { title: "Design", description: "Custom architectural planning" },
                { title: "Approval", description: "Handling all regulatory clearances" },
                { title: "Construction", description: "Execution with premium materials" },
                { title: "Handover", description: "Final quality check and delivery" }
            ],
            benefits: [
                { title: "Cost Efficient", description: "Optimized resource planning" },
                { title: "Timely Delivery", description: "Strict adherence to schedules" },
                { title: "Quality Guarantee", description: "Certified materials and workmanship" }
            ],
            faqs: [
                { question: "What is included in the price?", answer: "The price includes design, materials, and labor." },
                { question: "Can I customize the package?", answer: "Yes, all our packages are fully customizable." }
            ],
            is_popular: true,
            cta_text: "Get Quote",
            cta_link: "/contact"
        };

        // Check if exists
        const exists = await Package.findOne({ title: commercialPackage.title });
        if (exists) {
            console.log('Package already exists, updating...');
            await Package.findOneAndUpdate({ title: commercialPackage.title }, commercialPackage);
        } else {
            console.log('Creating new package...');
            await Package.create(commercialPackage);
        }

        console.log('Commercial Package Seeded Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding package:', error);
        process.exit(1);
    }
};

seedCommercialPackage();
