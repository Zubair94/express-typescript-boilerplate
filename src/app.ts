import * as express from "express";
import { Request, Response, NextFunction, Application} from "express";
import { publicRoutes } from "./routes"
import * as helmet from "helmet";
import * as httpLogger from "morgan";
export class App {
    app: Application;
    constructor() {
        this.app = express();
        this.middleware();        
        this.routerConfig();
        // TODO: Error Handling
        this.errorHandler();
        this.app.use("/api/v1", (req: Request, res: Response, next: NextFunction) => {
            res.status(200).json({success: true, message: "Express API Server"});
        });
        this.app.use("*", (req: Request, res: Response, next: NextFunction) => {
            res.status(404).json({success: false, message: "Invalid Endpoint"});
        });
    }
    private middleware() {
        // trust proxy
        this.app.set('trust proxy', 1);
        // helmet js
        this.app.use(helmet());
        // cors middleware
        this.cors();
        //TODO: Rate Limiter
        //TODO: Swagger Docs
        // http logger Morgan
        if (this.app.get('env') === 'production') {
            this.app.use(httpLogger('combined'));
        } else {
            this.app.use(httpLogger('dev'));
        }
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
        //TODO: Authentication
    }
    private cors() {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            let allowedOrigins = ['http://localhost:4200', 'http://192.168.1.101:4200'];
            let origin = req.headers["access-control-allow-origin"];
            // let remoteIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress;
            if (allowedOrigins.indexOf(origin) > -1) {
                res.header('access-control-allow-origin', origin);
            }
            res.header('access-control-allow-headers', 'origin, x-requested-with, content-type, accept, authorization');
            if (req.method === 'OPTIONS') {
                res.header('access-control-allow-methods', 'PUT, POST, DELETE, PATCH, GET');
                return res.status(200).json({});
            }
            next();
        });  
    }
    private errorHandler() {

    }
    private routerConfig() {
        this.app.use('/api/v1/public', publicRoutes);
    }
}