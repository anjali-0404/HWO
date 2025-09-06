import 'dotenv/config';
export const config = {
    port: parseInt(process.env.PORT || '8080', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || '*',
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/app',
    mlServiceUrl: process.env.ML_SERVICE_URL || '',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret'
};
