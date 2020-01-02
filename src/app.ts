import * as express from "express";
import { Request, Response, NextFunction, Application} from "express";
import { publicRoutes } from "@routes/index"
class App {
    app: Application;
    constructor() {
        this.app = express();
        this.middleware();        
        this.routerCofig();
        this.app.use("*", (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({success: true, message: "Express API Server"});
        });
    }
    private middleware() {
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
    }
    private routerCofig() {
        this.app.use('/api/v1/public', publicRoutes);
    }
}

export default new App().app;