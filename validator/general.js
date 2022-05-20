const Joi = require('joi');

const verifyPostSchema = Joi.object({
  a: Joi.string().required(),
  b: Joi.number().min(10).max(20).required()
}).unknown();

const verifyGetSchema = Joi.object({
  a: Joi.number().integer().required()
}).unknown();

module.exports = { verifyPostSchema, verifyGetSchema };