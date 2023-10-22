
const express = require("express");
const { signup, login, deleteUser, updateUser, changePassword, checkUserExist } = require("../controller/userController");
const userAuthentication = require("../middleware/auth");
const validateJoiSchema = require("../middleware/validateJoiSchema");
const signupJoiSchema = require("../joiSchemas/signupJoiSchema");
const deleteJoiSchema = require("../joiSchemas/deleteJoiSchema");
const loginSchema = require("../joiSchemas/loginJoiSchema");
const checkUserExistJoiSchema = require("../joiSchemas/checkUserExist");
const updateJoiSchema = require("../joiSchemas/updateJoiSchema");
const changePasswordJoiSchema = require("../joiSchemas/changePasswordJoiSchema");

const userRoute = express.Router();

userRoute.post("/v1/user/register", validateJoiSchema(signupJoiSchema),signup);

userRoute.post("/login", validateJoiSchema(loginSchema),login);

userRoute.put("/user",validateJoiSchema(updateJoiSchema),userAuthentication, updateUser);

userRoute.delete("/user", validateJoiSchema(deleteJoiSchema),userAuthentication, deleteUser);

userRoute.put('/changePassword',validateJoiSchema(changePasswordJoiSchema),userAuthentication,changePassword);

userRoute.post('/v1/user/credentialValidate', validateJoiSchema(checkUserExistJoiSchema), checkUserExist)

module.exports = userRoute;
