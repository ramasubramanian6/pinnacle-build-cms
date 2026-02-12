const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ServiceSubcategory = require('../models/ServiceSubcategory');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const updateServiceContent = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { family: 4 });
        console.log('MongoDB Connected');

        // Define content for specific subcategories
        const updates = [
            {
                slug: "commercial-construction", // Ensure this matches your actual slug
                process: [
                    { title: "Consultation", description: "Initial meeting to understand your business needs and vision." },
                    { title: "Design & Planning", description: "Architectural blueprints and space optimization planning." },
                    { title: "Approvals", description: "Handling all necessary municipal and safety approvals." },
                    { title: "Construction", description: "High-quality construction with regular progress updates." },
                    { title: "Handover", description: "Final inspection and key handover." }
                ],
                featuresDescription: "Our commercial construction services are defined by efficiency, durability, and modern aesthetics.",
                benefits: [
                    { title: "Optimized Space", description: "Designs that maximize utility and workflow efficiency." },
                    { title: "Sustainable", description: "Eco-friendly materials and energy-efficient systems." },
                    { title: "Brand Aligned", description: "Aesthetics that reflect your corporate identity." }
                ],
                faqs: [
                    { question: "What acts as the timeline?", answer: "Typical commercial projects take 6-12 months depending on scale." },
                    { question: "Do you handle interior design?", answer: "Yes, we offer turnkey solutions including interiors." }
                ]
            },
            {
                slug: "residential-construction",
                process: [
                    { title: "Concept", description: "We discuss your dream home requirements." },
                    { title: "Design", description: "Custom floor plans and 3D elevations." },
                    { title: "Build", description: "Construction with premium materials." },
                    { title: "Finish", description: "Interior finishing and detailing." }
                ],
                featuresDescription: "We build homes that blend comfort with luxury, ensuring every corner reflects your personality.",
                benefits: [
                    { title: "Custom Design", description: "Every home is unique to the owner." },
                    { title: "Quality Assurance", description: "50+ quality checks at every stage." },
                    { title: "Warranty", description: "10-year structural warranty." }
                ],
                faqs: [
                    { question: "Can I customize the plan?", answer: "Absolutely, customization is our specialty." },
                    { question: "What is the cost per sq ft?", answer: "It varies based on finishes, starting from Rs. 1800/sq ft." }
                ]
            }
        ];

        for (const update of updates) {
            const result = await ServiceSubcategory.updateOne(
                { slug: update.slug },
                { $set: { process: update.process, benefits: update.benefits, faqs: update.faqs, featuresDescription: update.featuresDescription } }
            );
            console.log(`Updated ${update.slug}:`, result.modifiedCount > 0 ? "Success" : "No changes/Not found");
        }

        console.log('Content update complete');
        process.exit();
    } catch (error) {
        console.error('Error updating content:', error);
        process.exit(1);
    }
};

updateServiceContent();
