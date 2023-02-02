import { pollSchema } from "../schema/Schemas.js";

function validadePoll(req, res, next) {
  const poll = req.body;
  const { error } = pollSchema.validate(poll, { abortEarly: false });
  const data = new Date();
  const dias = 30;

  function addDays(date, days) {
    date.setDate(date.getDate() + days);
    return date;
  }
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
  const novaData = addDays(data, dias);
  const dataExpire = formatDate(novaData);

  console.log(dataExpire);
  if (req.body.expireAt == "") {
    req.body.expireAt = dataExpire;
    console.log(req.body.expireAt);
  }

  if (error) {
    const message = error.details.map((detail) => detail.message);

    return res.status(422).send(message);
  }
  res.locals.poll = poll;
  next();
}

export { validadePoll };
