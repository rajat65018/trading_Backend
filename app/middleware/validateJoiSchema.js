const Joi = require('joi');
const { createErrorResponse } = require('../helpers/resHelper');

function validateJoiSchema(schema) {
    return (req, res, next) => {
		if (schema.body) {
			const result = Joi.object(schema.body).validate(req.body);
			if (result.error) {
				return res.json(createErrorResponse(result.error.message));
			}
		}
	
		if (schema.headers) {
			const result = Joi.object(schema.headers).unknown([(allow = false)]).validate(req.headers);
			if (result.error) {
				return res.json(createErrorResponse(result.error.message));
			}
		}
	
		if (schema.params) {
			const result = Joi.object(schema.params).validate(req.params);
			if (result.error) {
				return res.json(createErrorResponse(result.error.message));
			}
		}
		next();
    };
}

module.exports = validateJoiSchema;
