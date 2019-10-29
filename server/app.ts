import path from 'path';
import express from 'express';
import compression from 'compression';  // compresses requests
import session from 'express-session';
import flash from 'express-flash';
import bodyParser from 'body-parser';
import lusca from 'lusca';
// import dotenv from 'dotenv';
import expressValidator from 'express-validator';
import errorHandler from 'errorhandler';

import { SESSION_SECRET } from './util/secrets';

// // Load environment variables from .env file, where API keys and passwords are configured
// dotenv.config({ path: '.env.example' });

import LoggerFactory from './util/LoggerFactory';

import { HomeRouterFactory } from './routes/home-router';
import { ApiRouterFactory } from './routes/api-router';
import { DispatcRouterFactory } from './routes/main-router';

export const AppFactory = {
    create: () => {

        // Create Express server
        const app = express();

        // Express configuration
        app.set('port', process.env.PORT || 3000);
        app.set('views', path.join(__dirname, '../views'));
        app.set('view engine', 'pug');
        app.use(compression());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(expressValidator());
        app.use(session({
            resave: true,
            saveUninitialized: true,
            secret: SESSION_SECRET,
            store: new session.MemoryStore()
        }));
        app.use(flash());
        app.use(lusca.xframe('SAMEORIGIN'));

        app.use(LoggerFactory.getAccessLogHandler());
        app.use(
            express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
        );

        /**
         * Primary app routes.
         */
        app.use(HomeRouterFactory.create());
        app.use(ApiRouterFactory.create());
        app.use(DispatcRouterFactory.create());

        /**
         * Error Handler. Provides full stack - remove for production
         */
        app.use(errorHandler());

        return app;
    }
};

// export default app;
