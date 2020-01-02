import {Router} from "express";
import { PublicController } from "../controllers";

export const publicRoutes = Router();
publicRoutes.post('/', PublicController.fetchData);
