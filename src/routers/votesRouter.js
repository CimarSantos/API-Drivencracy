import { Router } from "express";
import { insertVote } from "../controllers/voteController.js";
import { validadeVote } from "../middlewares/vote.middleware.js";

const votesRouter = Router();

votesRouter.post("/choice/:id/vote", validadeVote, insertVote);

export { votesRouter };
