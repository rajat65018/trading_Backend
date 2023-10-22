const Joi = require("joi");
const deleteJoiSchema = {
  headers: { authorization: Joi.string().required() },
};
module.exports = deleteJoiSchema;
