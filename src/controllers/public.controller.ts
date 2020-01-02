import { NextFunction, Response, Request } from 'express';

export class PublicController{
    static async fetchData(req: Request, res: Response, next: NextFunction) {
        try {
            res.status(200).json({success: true, data: "data", message: "Data fetched"});
        } catch(error) {
            next(error);
        }
    }
}