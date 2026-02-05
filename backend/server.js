const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/user-projects', require('./routes/userProjectRoutes'));
app.use('/api/properties', require('./routes/propertyRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/slider-images', require('./routes/sliderImageRoutes'));
app.use('/api/promotions', require('./routes/promotionRoutes'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = parseInt(process.env.PORT) || 5001;

// For local development
if (process.env.NODE_ENV !== 'production') {
    const startServer = (port) => {
        const server = app.listen(port, '0.0.0.0', () => {
            console.log(`Server running on port ${port}`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is in use, trying ${Number(port) + 1}...`);
                startServer(Number(port) + 1);
            } else {
                console.error('Server error:', err);
                process.exit(1);
            }
        });
    };

    startServer(PORT);
}

// Export for Vercel serverless
module.exports = app;
