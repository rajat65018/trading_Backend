const express = require("express");
const {
  signup,
  login,
  deleteUser,
  updateUser,
} = require("../controller/userController");
const userAuthentication = require("../middleware/auth");
const validateJoiSchema = require("../middleware/validateJoiSchema");
const signupJoiSchema = require("../joiSchemas/signupJoiSchema");
const deleteJoiSchema = require("../joiSchemas/deleteJoiSchema");

const userRoute = express.Router();

userRoute.post("/signup", validateJoiSchema(signupJoiSchema),signup);

userRoute.post("/login", login);

userRoute.put("/user", userAuthentication, updateUser);

userRoute.delete("/user", validateJoiSchema(deleteJoiSchema),userAuthentication, deleteUser);

module.exports = userRoute;
