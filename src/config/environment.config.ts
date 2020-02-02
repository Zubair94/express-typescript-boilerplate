import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const DB_URI = process.env.DB_URI;
export const SECRET = process.env.SECRET;
export const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION;
