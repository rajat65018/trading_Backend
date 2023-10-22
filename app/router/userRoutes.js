const express = require("express");
const {
  signup,
  login,
  deleteUser,
  updateUser,
  changePassword,
  sendOtp,
  verifyOtp,
} = require("../controller/userController");
const userAuthentication = require("../middleware/auth");
const validateJoiSchema = require("../middleware/validateJoiSchema");
const signupJoiSchema = require("../joiSchemas/signupJoiSchema");
const deleteJoiSchema = require("../joiSchemas/deleteJoiSchema");
const loginSchema = require("../joiSchemas/loginJoiSchema");
const updateJoiSchema = require("../joiSchemas/updateJoiSchema");
const changePasswordJoiSchema = require("../joiSchemas/changePasswordJoiSchema");
const { verify } = require("jsonwebtoken");
const sendOtpJoiSchema = require("../joiSchemas/sendOtpJoiSchema");
const verifyOtpJoiSchema = require("../joiSchemas/verifyOtpJoiSchema");

const userRoute = express.Router();

userRoute.post("/signup", validateJoiSchema(signupJoiSchema), signup);

userRoute.post("/login", validateJoiSchema(loginSchema), login);

userRoute.put(
  "/user",
  validateJoiSchema(updateJoiSchema),
  userAuthentication,
  updateUser
);

userRoute.delete(
  "/user",
  validateJoiSchema(deleteJoiSchema),
  userAuthentication,
  deleteUser
);

userRoute.put(
  "/changePassword",
  validateJoiSchema(changePasswordJoiSchema),
  userAuthentication,
  changePassword
);

userRoute.put(
  "/sendOtp",
  validateJoiSchema(sendOtpJoiSchema),
  userAuthentication,
  sendOtp
);

userRoute.get(
  "/verifyOtp",
  validateJoiSchema(verifyOtpJoiSchema),
  userAuthentication,
  verifyOtp
);

module.exports = userRoute;
