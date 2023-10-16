const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
const { SMTPMAIL, SMTPPASSWORD } = require("../../config");
const { SECRET_KEY, SALT_ROUND } = require("../../config");

const helperFunction = {};

helperFunction.generateToken = (data) => {
  return jwt.sign(data, SECRET_KEY);
};

helperFunction.generateHash = async (data) => {
  return await bcrypt.hash(data, 8);
};

helperFunction.compareHash = async (data,compareData) => {
  return await bcrypt.compare(data,compareData);
};

helperFunction.decryptToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

helperFunction.sendEmail = async (req, res) => {
  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: SMTPMAIL,
      pass: SMTPPASSWORD,
    },
  });
  const sendMailOption = {
    from: SMTPMAIL,
    to: req.body.email,
    subject: "otp",
    text: generateOtp().toString(),
  };
  await transporter.sendMail(sendMailOption, function (error, info) {
    if (error) {
      console.log(error);
      return res.json({ message: error });
    } else {
      console.log(info);
    }
  });
};

helperFunction.generateOtp = () => {
  return Math.random();
};

module.exports = helperFunction;
