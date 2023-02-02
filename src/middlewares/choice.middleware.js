import { ObjectId } from "mongodb";
import { db } from "../database/mongo.js";
import { choiceSchema } from "../schema/Schemas.js";

/* Entrar na collection "polls" e procurar e pegar a poll com este ID */
/* Caso não retorne nada, dar um res com o erro 404*/

/* Acessar o banco de choices e procurar nele se existe uma choice com o mesmo título e com a mesma pollId */
/* Se encontrar algum, returne o erro 409*/

/* Se o expireAt da poll ainda não expirou. Caso tenha expirado, retorne o erro 403 */

/* Passado por tudo, returnar status 201, de criação com sucesso*/

async function validadeChoice(req, res, next) {
  const choice = req.body;
  const atualData = new Date();

  const { error } = await choiceSchema.validate(choice, { abortEarly: false });

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
    return res.status(500).send("Enquete não encontrada.");
  }

  /* if (error) {
    const message = error.details.map((detail) => detail.message);

    return res.status(422).send(message);
  } */
}

export { validadeChoice };
