import { Router } from "express";
import { choicesIn, choicesOut } from "../controllers/choiceController.js";
import { validadeChoice } from "../middlewares/choice.middleware.js";

const choiceRouter = Router();

choiceRouter.post("/choice", validadeChoice, choicesIn);
choiceRouter.get("/choice", choicesOut);

export { choiceRouter };
