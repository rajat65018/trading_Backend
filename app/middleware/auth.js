const { createErrorResponse } = require('../helpers/resHelper');
const sessionModel = require('../models/sessionModel');
const { findOneSession } = require('../services/sessoinService');
const { userType, tokenType } = require('../utils/constants');
const MESSAGES = require('../utils/messages');

async function userAuthentication(req, res, next) {
	try {
		const token = req.headers.authorization;
		const session = await findOneSession({ token: token, tokenType: tokenType.USER });

		req.body.session = session;
		if (!session) {
			return res.status(401).json(createErrorResponse(MESSAGES.UNAUTHORIZED_USER));
		}
		
		next();
	} catch (error) {
		return res.status(500).json(createErrorResponse(MESSAGES.INTERNAL_SERVER_ERROR));
	}
}

module.exports = userAuthentication;
