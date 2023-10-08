const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_KEY, SALT_ROUND } = require("../../config");

const helperFunction = {};

helperFunction.generateToken = (data) => {
  return jwt.sign(data, SECRET_KEY);
};

helperFunction.generateHash = async (data) => {
  return await bcrypt.hash(data, 8);
};

helperFunction.compareHash = async (data) => {
  return await bcrypt.compare(data);
};

helperFunction.decryptToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = helperFunction;
