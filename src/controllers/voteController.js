import { db } from "../database/mongo.js";

async function insertVote(req, res) {
  const choiceId = req.params.id;
  const data = new Date();

  const zeroFill = (n) => {
    return n < 9 ? `0${n}` : `${n}`;
  };
  const formatDate = (date) => {
    const d = zeroFill(date.getDate());
    const mo = zeroFill(date.getMonth() + 1);
    const y = zeroFill(date.getFullYear());
    const h = zeroFill(date.getHours());
    const mi = zeroFill(date.getMinutes());

    return `${y}-${mo}-${d} ${h}:${mi}`;
  };

  const createData = formatDate(data);
  try {
    await db
      .collection("votes")
      .insertOne({ id: choiceId, creationVote: createData });
    console.log(choiceId, createData);
    res.status(201).send("Voto inserido com sucesso");
  } catch (error) {
    return res.status(500).send(error);
  }
}

export { insertVote };
