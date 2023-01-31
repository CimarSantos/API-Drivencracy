import { Router } from "express";
import { poolIn, poolOut } from "../controllers/pollController.js";

const pollRouter = Router();

pollRouter.post("/poll", poolIn);
pollRouter.get("/poll", poolOut);

export { pollRouter };
