import { Router } from 'express';
import { Request, Response } from 'express';

export class HomeController {

    /**
     * GET /
     * Home page.
     */
    index(req: Request, res: Response) {
        res.render('home', {
            title: 'Home'
        });
    }
}


export const HomeRouterFactory = {
    create: () => {
        const controller = new HomeController();
        const router = Router();
        router.get('/', controller.index.bind(controller));
        return router;
    }
};
