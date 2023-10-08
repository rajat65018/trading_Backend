const Joi = require('joi');

const loginSchema = Joi.object({
    body: {
        email: Joi.String().email().required(),
        password: Joi.string().required()
    }
});

module.exports = loginSchema;