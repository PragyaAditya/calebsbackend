const Joi = require('joi');

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  email: Joi.string().email().required(),
  image: Joi.string().allow('')
});

module.exports = userValidationSchema;
