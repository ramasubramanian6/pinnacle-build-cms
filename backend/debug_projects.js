const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project'); // Adjust path as necessary

dotenv.config();

const connectDB = async () => {
    console.log("URI exists?", !!process.env.MONGODB_URI);
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await checkProjects();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const checkProjects = async () => {
    try {
        const projects = await Project.find({});
        console.log(`Found ${projects.length} projects.`);

        projects.forEach(project => {
            console.log(`Checking Project ID: ${project._id}`);
            console.log(`Title: ${project.title}`);
            console.log(`Team:`, project.team);
            console.log(`Extended Info:`, project.extended_info);
            // Check specific fields that might cause issues
            if (project.team && project.team.architect_image) {
                console.log(`Architect Image: ${typeof project.team.architect_image} - ${project.team.architect_image}`);
            }
            if (project.extended_info && project.extended_info.floors) {
                console.log(`Floors: ${typeof project.extended_info.floors} - ${project.extended_info.floors}`);
            }
            console.log('-----------------------------------');
        });

        console.log("All projects checked successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Error fetching projects:", error);
        process.exit(1);
    }
};

connectDB();
