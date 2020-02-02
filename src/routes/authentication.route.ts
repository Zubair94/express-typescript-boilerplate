import { Router } from "express";
import { AuthenticationController } from "../controllers";
import { requestHandler } from "../utils";

export const authenticationRoutes = Router();
authenticationRoutes.post('/', requestHandler(AuthenticationController.authenticate));
