import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import { db } from './config/db.js';
import { aj } from './lib/arcjet.js'; // Arcjet rate limiting middleware
import bookRoutes from './routes/bookRoutes.js';



dotenv.config();
const app = express();
const PORT = process.env.PORT;
// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//apply arcjet rate-limit to all routes
app.use(async (req, res, next) => {
    // Arcjet rate limiting logic here
    // For example, you can use aj middleware if you have it set up
    // aj(req, res, next);
    try {
        const decision = await aj.protect(req, {
            requested: 1 // number of requests
        })

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
            } else if (decision.reason.isBot()) {
                res.status(403).json({ error: 'Access denied for bots.' });
            } else {
                res.status(403).json({ error: 'Forbidden access.' });
            }
            return;
        };

        if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
            res.status(403).json({ error: 'Access denied for spoofed bots.' });
        };
        next();
    } catch (error) {
        console.log('Arcjet error:', error);
        next(error);
    }

});



app.use('/', bookRoutes)







async function connectDB() {
    try {
        await db`SELECT 1`; // simple dummy query to test DB connection
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
}


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})


