const Joi = require("joi");

const createProjectSchema = Joi.object({
  p_name: Joi.string().min(4).max(15).required(),
  p_desc: Joi.string().max(100).allow(''),
  p_tech: Joi.string(),
}).unknown();


module.exports = { createProjectSchema };
