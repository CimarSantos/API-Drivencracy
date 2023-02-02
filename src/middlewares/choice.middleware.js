import { ObjectId } from "mongodb";
import { db } from "../database/mongo.js";
import { choiceSchema } from "../schema/Schemas.js";

async function validadeChoice(req, res, next) {
  const choice = req.body;
  const atualData = new Date();

  const { error } = choiceSchema.validate(choice, { abortEarly: false });

  if (error) return res.status(422).send(error.message);

  const isPollExists = await db
    .collection("polls")
    .findOne({ _id: new ObjectId(choice.pollId) });

  if (!isPollExists) return res.status(404).send("Esta enquete não existe.");

  const expireAtFormatDate = new Date(isPollExists.expireAt);

  if (!(expireAtFormatDate > atualData))
    return res.status(403).send("Esta enquete esté expirada");

  const listChoices = await db
    .collection("choices")
    .find({ pollId: choice.pollId })
    .toArray();

  const isTitleExists = listChoices.find((e) => e.title === choice.title);

  if (isTitleExists) return res.status(409).send("Esta resposta já existe.");

  try {
    next();
  } catch (error) {
    return res.status(500).send("Erro no servidor.");
  }
}

export { validadeChoice };
