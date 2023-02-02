import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

import { pollRouter } from "./routers/pollRouter.js";
import { choiceRouter } from "./routers/choiceRouter.js";
import { votesRouter } from "./routers/votesRouter.js";
dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.use(pollRouter);
server.use(choiceRouter);
server.use(votesRouter);

server.listen(process.env.PORT, () =>
  console.log(chalk.blue(`Servidor funcionando na porta ${process.env.PORT}`))
);
