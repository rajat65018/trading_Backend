const sessionModel = require("../models/sessionModel");
const { findOneSession } = require("../services/sessoinService");
const { userType, tokenType } = require("../utils/constants");
const {
  UNAUTHORIZED_USER,
  INTERNAL_SERVER_ERROR,
} = require("../utils/messages");

async function userAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    console.log(token,'token');
    const session = await findOneSession({
      token: token,
      tokenType:tokenType.USER
    });
    req.body.session = session;
    if (!session) {
      return res.status(401).json({ message: UNAUTHORIZED_USER });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
}

module.exports = userAuthentication;
