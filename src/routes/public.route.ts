import {Router} from "express";
import { PublicController } from "@controllers/index";

export const publicRoutes = Router();
publicRoutes.post('/', PublicController.fetchData);
