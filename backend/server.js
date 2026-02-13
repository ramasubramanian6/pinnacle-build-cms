const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Database connection is handled in startServer for local dev
// For Vercel/Production, we need to initiate connection
if (process.env.NODE_ENV === 'production') {
    connectDB().catch(err => {
        console.error('Failed to connect to MongoDB:', err.message);
    });
}

const app = express();

const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration for Vercel serverless
// CORS Configuration
const allowedOrigins = [
    'https://brixxspace72.web.app',
    'https://brixxspace72.firebaseapp.com',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://localhost:8081',
    'http://localhost:8082'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    maxAge: 86400 // 24 hours
}));

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
app.use('/api/service-categories', require('./routes/serviceCategoryRoutes'));
app.use('/api/service-subcategories', require('./routes/serviceSubcategoryRoutes'));
app.use('/api/project-categories', require('./routes/projectCategoryRoutes'));
app.use('/api/project-subcategories', require('./routes/projectSubcategoryRoutes'));
app.use('/api/testimonials', require('./routes/testimonialRoutes'));
app.use('/api/workers', require('./routes/workerRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/slider-images', require('./routes/sliderImageRoutes'));
app.use('/api/promotions', require('./routes/promotionRoutes'));

const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = parseInt(process.env.PORT) || 5001;

// For local development
if (process.env.NODE_ENV !== 'production') {
    const startServer = async (port) => {
        try {
            await connectDB();
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
        } catch (error) {
            console.error('Failed to start server:', error);
            process.exit(1);
        }
    };

    startServer(PORT);
}

// Export for Vercel serverless
module.exports = app;
