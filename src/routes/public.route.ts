import {Router} from "express";
import { PublicController } from "../controllers";

export const publicRoutes = Router();
publicRoutes.get('/', PublicController.fetchData);
