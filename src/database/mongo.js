import { MongoClient } from "mongodb";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient
  .connect()
  .then(() => {
    db = mongoClient.db("drivencracy");
    console.log(chalk.cyan("Connected to database"));
  })
  .catch((err) => {
    console.log(chalk.red("Error connecting"));
  });

export { db };
