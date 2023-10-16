const Joi = require('joi');

const loginSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

module.exports = loginSchema;