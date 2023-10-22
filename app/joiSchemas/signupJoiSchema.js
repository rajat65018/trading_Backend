const Joi = require('joi');

const signupJoiSchema = {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        dob: Joi.date().required(),
        addressLine1: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.number().required(),
        password: Joi.string().min(8).max(20).required(),
        confirmPassword: Joi.string().min(8).max(20).required()
    }
};

module.exports = signupJoiSchema;