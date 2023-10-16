const Joi = require('joi');
const changePasswordJoiSchema = {
  body: {
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).max(20).required(),
  },
  headers: {
    authorization: Joi.string().required(),
  },
};

module.exports = changePasswordJoiSchema;
