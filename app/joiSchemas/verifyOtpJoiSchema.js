const Joi = require("joi");

const verifyOtpJoiSchema = {
  body: {
    otp: Joi.number().required(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
};

module.exports = verifyOtpJoiSchema;
