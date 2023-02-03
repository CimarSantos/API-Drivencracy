import { ObjectId } from "mongodb";
import { db } from "../database/mongo.js";

async function choicesIn(req, res) {
  const choice = req.body;

  try {
    await db.collection("choices").insertOne(choice);
    res.status(201).send(choice);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function choicesOut(req, res) {
    const id = req.params.id;

    try {
      const choicesList = await db
        .collection("choices")
        .find({ pollId: id })
        .toArray();
      return res.send(choicesList);
    } catch (error) {
      res.status(404).send("Erro ao carregar a lista de polls");
    }
}

export { choicesIn, choicesOut };
