import { MongoClient } from "mongodb";
import chalk from "chalk";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let database;

mongoClient
  .connect()
  .then(() => {
    database = mongoClient.database("drivencracy");
    console.log(chalk.cyan("Database is connected!"));
  })
  .catch((err) => {
    console.log(chalk.red("Error to connect to MongoDB"));
  });

export { database };
