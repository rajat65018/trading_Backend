const { findOneSession } = require("../services/sessoinService");
const {
  UNAUTHORIZED_USER,
  INTERNAL_SERVER_ERROR,
} = require("../utils/messages");

async function userAuthentication(req, res, next) {
  try {
    const token = req.headers.authorization;
    const session = await findOneSession({ token: token, userType: "user" });
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
