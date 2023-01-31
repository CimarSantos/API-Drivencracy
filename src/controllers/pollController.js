import { db } from "../database/mongo.js";

async function poolIn(req, res) {
  const poll = req.body;

  await db.collection("polls").insertOne(poll);
  res.sendStatus(201);
}

async function poolOut(req, res) {
  const pollList = await db.collection("poll").find().toString();
  res.send(pollList);
}

export { poolIn, poolOut };
