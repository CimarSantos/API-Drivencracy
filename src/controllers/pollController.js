import { ObjectId } from "mongodb";
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

async function pollResult(req, res) {
  const _id = req.params.id;

  const poll = await db.collection("polls").findOne({ _id: new ObjectId(_id) });
  if (!poll)
    return res.status(404).send("Esta enquente não existe, tente outra.");

  const ifContainChoice = await db
    .collection("choices")
    .find({ pollId: _id })
    .toArray();

  if (ifContainChoice.length === 0)
    return res.status(404).send("Esta enquete não ainda não tem respostas");

  const choiceIds = ifContainChoice.map((id) => `${id._id}`);
  /* console.log(ifContainChoice);
  console.log(choiceIds); */

  let listVotes = [];

  for (let i = 0; i < choiceIds.length; i++) {
    const votes = await db
      .collection("votes")
      .find({ idChoice: ifContainChoice[i].id })
      .toArray();

    const finalResult = {
      idChoice: ifContainChoice[i],
      votes: votes.length,
    };

    listVotes.push(finalResult);
  }

  console.log(listVotes);

  return res.send(ifContainChoice);
}

export { poolIn, poolOut, pollResult };
