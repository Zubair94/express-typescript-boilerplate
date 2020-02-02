import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models';
import { SECRET } from "../config";
import { UserStrategy, UserType } from '../enums';
export const authentication = async (strategies: Array<string> | string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try{
            const token = req.headers.authorization.split(" ")[1];
            const decoded: any = verify(token, SECRET, null);
            if(mapStrategy(strategies, decoded)) {
                req.user = await User.findOne({_id: decoded.data._id});
                next();
            } else {
                res.status(401).json({success:false, msg: 'Unauthorized'});
            }
        } catch(error){
            res.status(401).json({success:false, message: 'Unauthorized'});
        }
    }
};

function mapStrategy(strategy: Array<string> | string, decoded: any) {
    if(typeof strategy === "string") {
        return resolveStrategy(strategy, decoded);
    } else {
        let resolver = [];
        for(let i =0; i<strategy.length; i++) {
            resolver.push(resolveStrategy(strategy[i], decoded));
        }
        const index = resolver.findIndex(r => r === true);
        return index > -1;
    }
}

function resolveStrategy(strategy: string, decoded: any) {
    if(strategy === UserStrategy.ADMIN && decoded.data.role === UserType.ADMIN) {
        return true;
    } else if(strategy === UserStrategy.BASIC && decoded.data.role === UserType.BASIC) {
        return true;
    } else {
        return false;
    }
}
