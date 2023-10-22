const Joi = require("joi");
const updateJoiSchema = {
  body: {
    name: Joi.string(),
    address: Joi.string(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
};

module.exports = updateJoiSchema;
