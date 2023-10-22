const Joi = require('joi');
const changePasswordJoiSchema = {
  query: {
    email: Joi.string().email().required(),
    mobile: Joi.string().required(),
  }
};

module.exports = changePasswordJoiSchema;
