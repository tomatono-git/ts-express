import path from 'path';
import { Request, Response, Router } from 'express';

import LoggerFactory from '../util/LoggerFactory';
const logger = LoggerFactory.getLogger();

export class ApiController {

    /**
     * GET /
     * Home page.
     */
    index(req: Request, res: Response) {
        const filePath = path.join(__dirname, '../index.html');

        logger.log('index: __dirname=%s', __dirname);
        logger.log('index: filePath=%s', filePath);

        res.sendFile(filePath);
    }
}

export const ApiRouterFactory = {
    create: () => {
        const controller = new ApiController();
        const router = Router();

        router.get('/api', controller.index.bind(controller));

        return router;
    }
};
