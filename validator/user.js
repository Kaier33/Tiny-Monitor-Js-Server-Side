const Joi = require("joi");

const updateUserSchema = Joi.object({
  nickname: Joi.string().min(4).allow(''),
  email: Joi.string().email().allow(''),
  avatar: Joi.string().uri().allow(''),
}).unknown();

const changePasswordSchema = Joi.object({
  oldpass: Joi.string().min(6).required(),
  password: Joi.string().min(6).required()
});

module.exports = { changePasswordSchema, updateUserSchema };
