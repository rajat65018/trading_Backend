const Joi = require('joi');

const signupJoiSchema = {
    body: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(20).required(),
        address: Joi.string().required()
    }
};

module.exports = signupJoiSchema;