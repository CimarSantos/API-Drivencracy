import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());
server.listen(process.env.PORT, () =>
  console.log(`Servidor funcionando na porta ${process.env.PORT}`)
);