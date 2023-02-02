import { db } from "../database/mongo.js";

async function poolIn(req, res) {
  const poll = req.body;

  await db.collection("polls").insertOne(poll);
  res.sendStatus(201);
}

async function poolOut(req, res) {
  try {
    const pollList = await db.collection("polls").find().toArray();
    return res.send(pollList);
  } catch (error) {
    res.status(404).send("Erro ao carregar a lista de polls");
  }
}

export { poolIn, poolOut };
