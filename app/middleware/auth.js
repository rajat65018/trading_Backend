const { createErrorResponse } = require('../helpers/resHelper');

const { userType, tokenType, ERROR_TYPES } = require('../utils/constants');
const { decryptToken } = require('../utils/commonFunction');
const MESSAGES = require('../utils/messages');
const userServices = require('../services/userService');

async function userAuthentication(req, res, next) {
	try {
		if(!req.headers.authorization){
            return res.status(500).json(createErrorResponse(MESSAGES.UNAUTHORIZED_USER, ERROR_TYPES.UNAUTHORIZED));
        }

        let session = await decryptToken(req.headers.authorization);
        if (!session) {
            return res.status(500).json(createErrorResponse(MESSAGES.UNAUTHORIZED_USER, ERROR_TYPES.UNAUTHORIZED));
        }

        let user = await userServices.findOneUser({ _id: session.userId, isVerified:true, isDeleted: { $ne: true } }, { password: 0 });
        if (!user) {
            return res.status(500).json(createErrorResponse(MESSAGES.UNAUTHORIZED_USER, ERROR_TYPES.UNAUTHORIZED));
        }

		req.token = req.headers.authorization;
		req.user = user;

		next();
	} catch (error) {
		console.log(error);
		return res.status(500).json(createErrorResponse(MESSAGES.INTERNAL_SERVER_ERROR, ERROR_TYPES.INTERNAL_SERVER_ERROR));
	}
}

module.exports = userAuthentication;
