const Joi = require('joi');
const { createErrorResponse } = require('../helpers/resHelper');
const MESSAGES = require('../utils/messages');
const { ERROR_TYPES } = require('../utils/constants');

function validateJoiSchema(schema) {
    return (req, res, next) => {
		if (schema.body) {
			const result = Joi.object(schema.body).validate(req.body);
			if (result.error) {
				return res.json(createErrorResponse(result.error.message, ERROR_TYPES.BAD_REQUEST));
			}
		}
	
		if (schema.headers) {
			const result = Joi.object(schema.headers).unknown([(allow = false)]).validate(req.headers);
			if (result.error) {
				return res.json(createErrorResponse(result.error.message, ERROR_TYPES.BAD_REQUEST));
			}
		}
	
		if (schema.params) {
			const result = Joi.object(schema.params).validate(req.params);
			if (result.error) {
				return res.json(createErrorResponse(result.error.message, ERROR_TYPES.BAD_REQUEST));
			}
		}
		next();
    };
}

module.exports = validateJoiSchema;
