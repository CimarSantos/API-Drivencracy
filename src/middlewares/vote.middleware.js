import { db } from "../database/mongo.js";
import { ObjectId } from "mongodb";

async function validadeVote(req, res, next) {
  const choiceId = req.params.id;
  const atualData = new Date();

  try {
    const choiceExists = await db
      .collection("choices")
      .findOne({ _id: new ObjectId(choiceId) });
    if (!choiceExists) return res.status(404).send("Esta resposta não existe.");

    const isPollExists = await db
      .collection("polls")
      .findOne({ _id: new ObjectId(choiceExists.pollId) });

    const expireAtFormatDate = new Date(isPollExists.expireAt);

    if (!(expireAtFormatDate > atualData))
      return res.status(403).send("Esta enquete esté expirada");
  } catch (error) {
    return res.status(500).send(error.message);
  }

  next();
}

export { validadeVote };
