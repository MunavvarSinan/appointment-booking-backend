import cors from 'cors';
import express from 'express';
import type { Application, Request, Response } from 'express';


import { logger } from './utils/logger';
import { notFoundHandler } from './middlewares/not-found-handler';
import { errorHandler } from './middlewares/error-handler';
import { registerRoutes } from './api/route';

export async function createServer(): Promise<Application> {
    const app = express();

    // Security middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    // Logging middleware
    app.use((req, _res, next): void => {
        logger.info(
            {
                method: req.method,
                url: req.url,
                ip: req.ip,
                userAgent: req.get('user-agent'),
            },
            'Incoming request',
        );
        next();
    });

    // Health Routes
    app.get('/api/v1/health', (_req: Request, res: Response): void => {
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
        });
    });

    // Register routes
    registerRoutes(app);

    // Error handling
    app.use(notFoundHandler);
    app.use(errorHandler);

    return app;
}
