import joi from "joi";

const pollSchema = joi.object().keys({
  title: joi.string().min(3).required(),
  expireAt: joi.required(),
});

const choiceSchema = joi.object().keys({
  title: joi.string().min(3).required(),
  pollId: joi.required(),
});

export { pollSchema, choiceSchema };
