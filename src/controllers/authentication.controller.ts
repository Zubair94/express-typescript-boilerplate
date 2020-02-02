import { Request, Response, NextFunction } from "express";
import { User, comparePassword } from "../models";
import { ErrorResponse, responseHandler } from "../utils";
import { sign, Secret } from 'jsonwebtoken';
import { SECRET, TOKEN_EXPIRATION } from "../config";

export class AuthenticationController {
    static async authenticate(req: Request, res: Response, next: NextFunction) {
        const email = req.body.email;
        const password = req.body.email;
        const user  = await User.findOne({email: email});
        if(!user){
            next(new ErrorResponse('User not found', 404));
        } else {
            let isMatch = await comparePassword(password, user.userPassword);
            if(isMatch) {
                const token = sign({
                    data: {
                        _id: user._id,
                        role: user.userRole
                    }
                }, SECRET, {
                    expiresIn: TOKEN_EXPIRATION
                });
                responseHandler(res, 200, true, 'Logged in successfully', {token: `Bearer ${token}`});
            } else {
                next(new ErrorResponse('Incorrect password entered', 401));
            }
        }
    }
}