import { Router } from "express";
import { PrivateController } from "../controllers";
import { authentication } from "../middlewares";
import { requestHandler } from "../utils";

export const privateRoutes = Router();
privateRoutes.get('/', authentication, requestHandler(PrivateController.fetchData));
