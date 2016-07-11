/* eslint-disable consistent-return, no-param-reassign */

import joi from 'joi';

const schema = {
  name: joi.string().required(),
  sqFt: joi.number().required(),
  bedrooms: joi.number().required(),
  floor: joi.number().min(1).max(5),
  rent: joi.number().min(1).max(5000),
  renter: joi.string().regex(/^[0-9a-f]{24}$/),
};

module.exports = (req, res, next) => {
  const result = joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send({ messages: result.error.details.map(d => d.message) });
  } else {
    res.locals = result.value;
    next();
  }
};
