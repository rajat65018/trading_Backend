const express = require('express');

const joiSchema = require('../joiSchemas/joiSchema');
const userAuthentication = require('../middleware/auth');
const userController = require('../controller/userController');
const validateJoiSchema = require('../middleware/validateJoiSchema');

const userRoute = express.Router();

userRoute.post('/v1/user/register', validateJoiSchema(joiSchema.signupSchema),userController.signup);

userRoute.post('/v1/user/login', validateJoiSchema(joiSchema.loginSchema), userController.login);

userRoute.put('/v1/user/update', validateJoiSchema(joiSchema.updateUserSchema), userAuthentication, userController.updateUser);

userRoute.get('/v1/user', validateJoiSchema(joiSchema.getUserSchema), userAuthentication, userController.getUser);

userRoute.delete('/user', validateJoiSchema(joiSchema.deleteUserSchema), userAuthentication, userController.deleteUser);

userRoute.put('/v1/user/password/change', validateJoiSchema(joiSchema.changePasswordSchema), userAuthentication, userController.changePassword);

userRoute.put('/v1/user/password/reset', validateJoiSchema(joiSchema.changePasswordSchema), userAuthentication, userController.changePassword);

userRoute.post('/v1/user/password/forgot', validateJoiSchema(joiSchema.passwordForgotSchema), userController.forgotPassword);

userRoute.put('/sendOtp', validateJoiSchema(joiSchema.sendOtpSchema), userAuthentication, userController.sendOtp );

userRoute.post('/v1/user/verifyUser', validateJoiSchema(joiSchema.verifyOtpSchema), userController.verifyUser);

userRoute.post('/v1/user/verifyOtp', validateJoiSchema(joiSchema.verifyOtpSchema), userController.verifyOtp);

userRoute.post('/v1/user/credentialValidate', validateJoiSchema(joiSchema.checkUserExistSchema), userController.checkUserExist)

module.exports = userRoute;
