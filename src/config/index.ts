import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 8000,
    db: {
        url: process.env.DATABASE_URL
    },
    nodeEnv: process.env.NODE_ENV || 'development',
    isProduction: process.env.NODE_ENV === 'production',

};