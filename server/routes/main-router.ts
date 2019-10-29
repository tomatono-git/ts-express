import path from 'path';
import { Request, Response, Router } from 'express';
import http from 'http';

import LoggerFactory from '../util/LoggerFactory';
import { async } from 'q';
const logger = LoggerFactory.getLogger();

export class DispatchController {

    /**
     * GET /
     * Home page.
     */
    dispatch(req: Request, res: Response) {
        logger.debug('dispatch(): req.url=%s', req.url);
        logger.debug('dispatch(): req.query=%o', req.query);
        logger.debug('dispatch(): req.params=%o', req.params);

        // res.redirect('http://loginebula-local.com/ahprl9syxmi3xy4ibofaf/dispatch');

        // http://localhost:3000/ahprl9syxmi3xy4ibofaf/dispatch?api=sc.sthd.init&tn=CURRENT
        // http://loginebula-local.com/ahprl9syxmi3xy4ibofaf/dispatch?api=sc.sthd.init&tn=CURRENT

        var url = 'http://loginebula-local.com' + req.url;

        logger.debug('dispatch(): url=%s', url);

        return (async () => {
            try {
                var response = await this.get(url);
                logger.debug('dispatch(): response=%s', response);
                return res.send(response);
            } catch (error) {
                logger.error(error);
                return res.status(500).json({
                    message: error.message,
                    x: error.stack,
                });
            }
        })();


        // const filePath = path.join(__dirname, '../index.html');

        // logger.log('index: __dirname=%s', __dirname);
        // logger.log('index: filePath=%s', filePath);

        // res.sendFile(filePath);
    }

    private get(url: string) {

        // let body = '';

        return new Promise((resolve, reject) => {

            http.get(url, res => {
                const { statusCode } = res;
                const contentType = res.headers['content-type'];

                logger.debug('get() on data: statusCode=%s, contentType=%s', statusCode, contentType);

                let error;
                if (statusCode !== 200 && statusCode !== 302) {
                    error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
                    // } else if (!/^application\/json/.test(contentType)) {
                    //     error = new Error('Invalid content-type.\n' +
                    //         `Expected application/json but received ${contentType}`);
                }
                if (error) {
                    logger.error(error);
                    // Consume response data to free up memory
                    // res.resume();
                    reject(error);
                    return;
                }

                res.setEncoding('utf8');
                let rawData = '';

                res.on('data', chunk => {
                    logger.debug('get() on data: chunk=%o', chunk);
                    rawData += chunk;
                });

                res.on('end', () => {
                    var res = JSON.parse(rawData);
                    try {
                        const parsedData = JSON.parse(rawData);
                        logger.debug('parsedDat=%o', parsedData);
                        resolve(parsedData);
                    } catch (e) {
                        logger.error(e);
                        reject(e);
                    }
                });

            }).on('error', err => {
                logger.error(err);
                reject(err);
            });

        });

    }
}

export const DispatcRouterFactory = {
    create: () => {
        const controller = new DispatchController();
        const router = Router();

        router.get('/ahprl9syxmi3xy4ibofaf/dispatch', controller.dispatch.bind(controller));

        return router;
    }
};
