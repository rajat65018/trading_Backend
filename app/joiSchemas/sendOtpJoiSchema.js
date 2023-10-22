const Joi = require("joi");

const sendOtpJoiSchema = {
  body: {
    email: Joi.string().email().required(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
};

module.exports = sendOtpJoiSchema;
