import { Router } from "express";
import { pollResult, poolIn, poolOut } from "../controllers/pollController.js";
import { validadePoll } from "../middlewares/poll.middleware.js";

const pollRouter = Router();

pollRouter.post("/poll", validadePoll, poolIn);
pollRouter.get("/poll", poolOut);
pollRouter.get("/poll/:id/result", pollResult);

export { pollRouter };
