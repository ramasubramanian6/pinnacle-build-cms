const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('../models/Project');
const User = require('../models/User'); // Need a user specific to project
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const seedProjects = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('MongoDB Connected');

        // Find an admin user to assign projects to
        const adminUser = await User.findOne({ role: 'admin' });
        const userId = adminUser ? adminUser._id : new mongoose.Types.ObjectId(); // Fallback if no admin

        const ServiceSubcategory = require('../models/ServiceSubcategory');
        const ServiceCategory = require('../models/ServiceCategory');

        // Fetch Categories/Subcategories
        const commSub = await ServiceSubcategory.findOne({ slug: 'commercial-construction' });
        const resSub = await ServiceSubcategory.findOne({ slug: 'residential-construction' });

        if (!commSub || !resSub) {
            console.log("Service Subcategories not found. Please run update_service_content.js first, or ensure data exists.");
            // Proceeding with just what we have or exiting? Best to log and maybe skip linking if missing.
        }

        const projects = [
            {
                title: "Skyline Commercial Complex",
                description: "A premium commercial hub located in the heart of the city, designed for modern businesses. Featuring state-of-the-art office spaces, retail outlets, and sustainable energy solutions.",
                location: "Bangalore, Karnataka",
                category: "Commercial",
                serviceCategory: commSub ? commSub.category : null,
                serviceSubcategory: commSub ? commSub._id : null,
                status: "ongoing",
                image_url: "/images/projects/commercial-complex.jpg",
                user_id: userId,
                featuresDescription: "This project redefines workspace dynamics with its human-centric design and eco-friendly architecture.",
                process: [
                    { title: "Planning", description: "Strategic site analysis and feasibility studies." },
                    { title: "Structure", description: "Steel frame construction for maximum durability." },
                    { title: "Interiors", description: "Smart office layouts with ergonomic designs." },
                    { title: "Handover", description: "Final testing of all systems and occupancy certification." }
                ],
                benefits: [
                    { title: "Prime Location", description: "High visibility and easy accessibility." },
                    { title: "Energy Efficient", description: "LEED Gold certified building." },
                    { title: "Smart Amenities", description: "Automated climate control and security." }
                ],
                faqs: [
                    { question: "Is parking available?", answer: "Yes, 3 levels of basement parking." },
                    { question: "What is the lease period?", answer: "Minimum 3 years lock-in period." }
                ]
            },
            {
                title: "Green Valley Residencies",
                description: "Luxury residential apartments nestled in nature. Offering a blend of tranquility and modern living with world-class amenities.",
                location: "Mysore, Karnataka",
                category: "Residential",
                serviceCategory: resSub ? resSub.category : null,
                serviceSubcategory: resSub ? resSub._id : null,
                status: "ongoing", // Changed to match "Construction" context usually implies ongoing/completed
                image_url: "/images/projects/residential-green.jpg",
                user_id: userId,
                featuresDescription: "Experience the perfect harmony of nature and luxury living.",
                process: [
                    { title: "Foundation", description: "Deep pile foundation for stability." },
                    { title: "Superstructure", description: "RCC framed structure with concrete blocks." },
                    { title: "Finishing", description: "Premium flooring and Italian marble finishes." }
                ],
                benefits: [
                    { title: "Eco-Friendly", description: "Rainwater harvesting and solar power." },
                    { title: "Community", description: "Gated community with 24/7 security." },
                    { title: "Recreation", description: "Clubhouse, pool, and gym included." }
                ],
                faqs: [
                    { question: "When is the possession date?", answer: "December 2025." },
                    { question: "Do you provide loan assistance?", answer: "Yes, we have tie-ups with all major banks." }
                ]
            }
        ];

        for (const project of projects) {
            const exists = await Project.findOne({ title: project.title });
            if (exists) {
                console.log(`Updating project: ${project.title}`);
                await Project.updateOne({ title: project.title }, { $set: project });
            } else {
                console.log(`Creating project: ${project.title}`);
                await Project.create(project);
            }
        }

        console.log('Projects Seeded/Updated Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding projects:', error);
        process.exit(1);
    }
};

seedProjects();
