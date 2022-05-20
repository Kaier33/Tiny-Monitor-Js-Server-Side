const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required()
})

module.exports = { loginSchema, registerSchema };