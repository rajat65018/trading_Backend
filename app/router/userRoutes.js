const express = require('express');

const joiSchema = require('../joiSchemas/joiSchema');
const userAuthentication = require('../middleware/auth');
const userController = require('../controller/userController');
const validateJoiSchema = require('../middleware/validateJoiSchema');

const userRoute = express.Router();

userRoute.post('/v1/user/register', validateJoiSchema(joiSchema.signupSchema),userController.signup);

userRoute.post('/userController.login', validateJoiSchema(joiSchema.loginSchema), userController.login);

userRoute.put('/user', validateJoiSchema(joiSchema.updateUserSchema), userAuthentication, userController.updateUser);

userRoute.delete('/user', validateJoiSchema(joiSchema.deleteUserSchema), userAuthentication, userController.deleteUser);

userRoute.put('/changePassword', validateJoiSchema(joiSchema.changePasswordSchema), userAuthentication, userController.changePassword);

userRoute.put('/sendOtp', validateJoiSchema(joiSchema.sendOtpSchema), userAuthentication, userController.sendOtp );

userRoute.get('/verifyOtp',validateJoiSchema(joiSchema.verifyOtpSchema), userAuthentication, userController.sendOtp);

userRoute.post('/v1/user/credentialValidate', validateJoiSchema(joiSchema.checkUserExistSchema), userController.checkUserExist)

module.exports = userRoute;
