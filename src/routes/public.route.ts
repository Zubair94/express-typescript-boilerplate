import {Router} from "express";
import { PublicController } from "@controllers/index";

export const publicRoute = Router();
publicRoute.post('/', PublicController.fetchData);
