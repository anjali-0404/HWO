import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config.js';
import { connectDB } from './db.js';
import healthRoutes from './routes/health.js';
import aiRoutes from './routes/ai.js';
import leaderboardRoutes from './routes/leaderboard.js';
import { notFound, errorHandler } from './middleware/error.js';
async function start() {
    await connectDB();
    const app = express();
    // Security & logging
    app.use(helmet());
    app.use(cors({ origin: config.corsOrigin }));
    app.use(express.json({ limit: '10mb' }));
    app.use(morgan('dev'));
    // Root route for quick testing
    app.get('/', (req, res) => {
        res.json({ message: 'HWO Backend is running 🚀' });
    });
    // API routes
    app.use('/api', healthRoutes);
    app.use('/api/ai', aiRoutes);
    app.use('/api/leaderboard', leaderboardRoutes);
    // Catch-all for undefined API endpoints
    app.all('/api/*', (req, res) => {
        res.status(404).json({ error: 'API endpoint not found' });
    });
    // Middleware for 404 and errors
    app.use(notFound);
    app.use(errorHandler);
    // Start server
    app.listen(config.port, () => {
        console.log(`🚀 API running on http://localhost:${config.port}`);
    });
}
// Start the server and catch any errors
start().catch((e) => {
    console.error('Failed to start server:', e);
    process.exit(1);
});
