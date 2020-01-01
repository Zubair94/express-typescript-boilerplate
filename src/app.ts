import * as express from "express";

class App {
    app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();        
    }
    private middleware() {
        // support application/json type post data
        this.app.use(express.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(express.urlencoded({ extended: false }));
    }
}

export default new App().app;