const Joi = require('joi');

const joiSchema = {};

joiSchema.changePasswordSchema = {
    body: {
        newPassword: Joi.string().min(8).max(20).required()
    },
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.passwordForgotSchema = {
    body: {
        email: Joi.string().email().required()
    }
};

joiSchema.checkUserExistSchema = {
    query: {
        mobile: Joi.string().required(),
        email: Joi.string().email().required()
    }
};

joiSchema.deleteUserSchema = {
    headers: { authorization: Joi.string().required() }
};

joiSchema.loginSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

joiSchema.sendOtpSchema = {
    body: {
        email: Joi.string().email().required()
    },
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.signupSchema = {
    body: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().required(),
        dob: Joi.date().required(),
        addressLine1: Joi.string().required(),
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        postalCode: Joi.number().required(),
        password: Joi.string().min(8).max(20).required()
    }
};

joiSchema.updateUserSchema = {
    body: {
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        mobile: Joi.string().optional(),
        dob: Joi.date().optional(),
        addressLine1: Joi.string().optional(),
        county: Joi.string().required(),
        state: Joi.string().optional(),
        city: Joi.string().optional(),
        postalCode: Joi.number().optional()
    },
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.getUserSchema = {
    headers: {
        authorization: Joi.string().required()
    }
};

joiSchema.verifyOtpSchema = {
    body: {
        email: Joi.string().email().required(),
        otp: Joi.number().required(),
    }
};

module.exports = joiSchema;