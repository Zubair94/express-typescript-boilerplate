import { Document, model, Schema } from 'mongoose';
import { UserType } from '../enums';
import { NextFunction } from 'express';
import { genSalt, hash, compare } from 'bcrypt'; 
const UserSchema = new Schema({
    userName: {
        type: String,
        trim: true,
        required: [true, 'Property userName missing from req.body'],
        maxlength: [200, 'userName cannot be more than 200 characters']
    },
    userEmail: {
        type: String,
        trim: true,
        required: [true, 'Property userEmail missing from req.body'],
        maxlength: [200, 'userEmail cannot be more than 200 characters']
    },
    userRole: {
        type: String,
        default: UserType.BASIC,
        enum: [
            UserType.BASIC,
            UserType.ADMIN
        ]
    },
    userPassword: [{
        type: String,
        required: [true, 'Property userPassword missing from req.body'],
        select: false,
    }]
}, { timestamps: true });
export interface IUser extends Document {
    userName: string;
    userEmail: string;
    userRole: string;
    userPassword: string;
}
export const User = model<IUser>('User', UserSchema);

export const hashPassword = async function(password: string, next: NextFunction){
    const salt = await genSalt(10);
    return hash(password, salt);
};

export const comparePassword = async function(candidatePassword: string, hash: string){
    return compare(candidatePassword, hash);
};