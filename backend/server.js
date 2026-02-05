const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database (async, non-blocking for serverless)
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err.message);
    // Don't crash the server, just log the error
});

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration for Vercel serverless
app.use((req, res, next) => {
    const allowedOrigins = [
        'https://brixxspace72.web.app',
        'https://brixxspace72.firebaseapp.com',
        'http://localhost:3000',
        'http://localhost:5173'
    ];

    const origin = req.headers.origin;

    // Allow all origins in development, specific origins in production
    if (process.env.NODE_ENV !== 'production' || allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin || '*');
    } else {
        res.header('Access-Control-Allow-Origin', '*');
    }

    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    next();
});

app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));
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
