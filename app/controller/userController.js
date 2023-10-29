const bcrypt = require('bcrypt');

const CONSTANTS = require('../utils/constants');
const MESSAGE = require('../utils/messages');
const userService = require('../services/userService');
const commonFunction = require('../utils/commonFunction');
const sessionService = require('../services/sessoinService');
const { createSuccessResponse, createErrorResponse } = require('../helpers/resHelper');

const userController = {};

userController.signup = async (req, res) => {
  try {
    const payload = req.body;

    let user = await userService.findOneUser({ email: payload.email, isDeleted: { $ne: true }});
    if (user) {
      return res.status(400).json({ message: MESSAGE.USER_ALREADY_EXIST });
    }

    payload.password = await commonFunction.generateHash(payload.password);
    user = await userService.createUser(payload);

    const token = commonFunction.generateOtp();

	await sessionService.createSession({ userId: user._id, token, tokenType: CONSTANTS.TOKEN_TYPE.OTP });
	const data = { email: user.email, subject: 'Otp for the email verification', message: `Your Otp for the email verification is ${token}` };
	req.body.data = data;
	await commonFunction.sendEmail(req, res);

    res.status(200).json(createSuccessResponse(MESSAGE.OTP_SENT_SUCCESSFULLY));
  } catch (error) {
    console.log(error);
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
  }
};

userController.checkUserExist = async (req, res) => {
    try {
      const payload = req.body;

      let isEmailExist = await userService.findOneUser({ email: payload.email, isDeleted: { $ne: true } });
      let isMobileExist = await userService.findOneUser({ mobile: payload.mobile, isDeleted: { $ne: true } });
      
      res.status(200).json(createSuccessResponse(MESSAGE.SUCCESS, { email: !!isEmailExist, mobile: !!isMobileExist }));
    } catch (error) {
      console.log(error);
      res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
    }
};

userController.login = async (req, res) => {
  try {
    const payload = req.body;

    const user = await userService.findOneUser({ email: payload?.email, isDeleted: { $ne: true }});
    if (!user) {
      return res.status(401).json(createErrorResponse(MESSAGE.USER_NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND));
    }

    const password = await bcrypt.compare(payload.password, user.password);
    if (!password) {
		return res.status(401).json(createErrorResponse(MESSAGE.INVALID_CREDENTIALS, CONSTANTS.ERROR_TYPES.BAD_REQUEST));
    }

	let token = commonFunction.generateToken({ userId: user._id });
	await sessionService.createSession({ userId: user._id, token: token, tokenType: CONSTANTS.TOKEN_TYPE.LOGIN });

	delete user.password
	
    return res.status(200).json(createSuccessResponse(MESSAGE.USER_LOGIN_SUCCESSFULLY, { user, token }));
  } catch (error) {
    console.log(error, 'error');
    return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
  }
};

userController.updateUser = async (req, res) => {
	try {

		let user = await userService.findOneAndUpdateUser({ _id: req.user._id, isDeleted: { $ne: true }}, req.body, { new: true });

		return res.status(200).json(createSuccessResponse(MESSAGE.USER_DATA_UPDATED, user));
	} catch (error) {
		console.log(error, 'error');
		return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
	}
};

userController.getUser = async (req, res) => {
	try {
  
	  return res.status(200).json(createSuccessResponse(MESSAGE.USER_PROFILE_FETCHED, req.user));
	} catch (error) {
	  console.log(error, 'error');
	  return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
	}
};

userController.deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    await userService.findOneAndUpdateUser({ _id: userId, isDeleted: { $ne: true } }, { $set: { isDeleted: true } });
    await sessionService.findOneAndDeleteSession({ userId: userId });

    return res.status(200).json(createSuccessResponse(MESSAGE.USER_DELETED_SUCCESSFULLY));
  } catch (error) {
    return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
  }
};

userController.changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    let newPassword = req.body.newPassword;

    newPassword = await commonFunction.generateHash(req.body.newPassword);
    await userService.findOneAndUpdateUser({ _id: userId }, { $set: { password: newPassword } });

    return res.status(200).json(createSuccessResponse(MESSAGE.PASSWORD_UPDATED_SUCCESSFULLY));
  } catch (error) {
    console.log(error, 'error');
    return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
  }
};

userController.forgotPassword = async (req, res) => {
  try {

    const user = await userService.findOneUser({ email: req.body.email, isDeleted: { $ne: true }, isVerified: true });
    if (!user) {
      return res.status(404).json(createErrorResponse(MESSAGE.USER_NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND));
    }

	let otp = commonFunction.generateOtp();
	await sessionService.findOneAndUpdateSession({ userId: user._id }, { $set: { token: otp, tokenType: CONSTANTS.TOKEN_TYPE.OTP } }, { upsert: true })

    return res.status(200).json(createSuccessResponse(MESSAGE.OTP_SENT_SUCCESSFULLY));
  } catch (error) {
    console.log(error, 'error');
    return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
  }
};

userController.sendOtp = async (req, res) => {
	try {
		const email = req.body.email;
		const otp = commonFunction.generateOtp();
		const token = commonFunction.generateToken({ otp: otp });
		const userDetails = req.user;
		const otpTokenExist = await sessionService.findOneSession({ userId: userDetails._id, tokenType: CONSTANTS.TOKEN_TYPE.OTP });
		if (otpTokenExist) {
			await sessionService.findOneAndUpdateSession(
				{ userId: userDetails._id, tokenType: CONSTANTS.TOKEN_TYPE.OTP },
				{ $set: { token: token } }
			);
		} else {
			await sessionService.createSession({ userId: userDetails._id, token: token, tokenType: CONSTANTS.TOKEN_TYPE.OTP });
		}
		const data = { email: email, subject: 'Otp for the email verification', message: `Your Otp for the email verification is ${otp}` };
		req.body.data = data;
		await commonFunction.sendEmail(req, res);
		// await sessionService.createSession(sessionObj);
		return res.status(200).json({ message: MESSAGE.OTP_SENT_SUCCESSFULLY });
	} catch (error) {
		console.log(error, 'eroro');
		return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
	}
};

userController.verifyUser = async (req, res) => {
	try {

		let user = await userService.findOneUser({ email: req.body.email, isDeleted: { $ne: true } });
		if (!user) {
			return res.status(400).json(createErrorResponse(MESSAGE.USER_NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND));
		} else if (user.isVerified) {
			return res.status(400).json(createErrorResponse(MESSAGE.USER_ALREADY_VERIFIED, CONSTANTS.ERROR_TYPES.BAD_REQUEST));
		}

		const otpToken = await sessionService.findOneSession({ userId: user._id, tokenType: CONSTANTS.TOKEN_TYPE.OTP });
		console.log(otpToken,'otpToken=====');
		console.log(req.body.otp,'req.body.epot')
		if (!otpToken) {
			return res.status(400).json(createErrorResponse(MESSAGE.INVALID_OTP, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND));
		}

		if (req.body.otp.toString() !== otpToken.token.toString()) {
			return res.status(400).json(createErrorResponse(MESSAGE.INVALID_OTP, CONSTANTS.ERROR_TYPES.BAD_REQUEST));
		}

		await userService.findOneAndUpdateUser({ _id: user._id }, { $set: { isVerified: true } }, { new: true });

		return res.status(200).json(createSuccessResponse(MESSAGE.OTP_VERIFIED_SUCCESSFULLY));
	} catch (error) {
		console.log(error);
		return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
	}
};

userController.verifyOtp = async (req, res) => {
	try {

		console.log(req.body.email,'req.body.email');
		let user = await userService.findOneUser({ email: req.body.email, isDeleted: { $ne: true }, isVerified: true });
		if (!user) {
			return res.status(400).json(createErrorResponse(MESSAGE.USER_NOT_FOUND, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND));
		}

		const otpToken = await sessionService.findOneSession({ userId: user._id, tokenType: CONSTANTS.TOKEN_TYPE.OTP });
		if (!otpToken) {
			return res.status(400).json(createErrorResponse(MESSAGE.INVALID_OTP, CONSTANTS.ERROR_TYPES.DATA_NOT_FOUND));
		}

		if (req.body.otp !== otpToken.token) {
			return res.status(400).json(createErrorResponse(MESSAGE.INVALID_OTP, CONSTANTS.ERROR_TYPES.BAD_REQUEST));
		}

		let token = commonFunction.generateToken({ userId: user._id });
		await sessionService.findOneAndUpdateSession({ userId: user._id }, { $set: { token, tokenType: CONSTANTS.TOKEN_TYPE.LOGIN } }, { upsert: true });

		return res.status(200).json(createSuccessResponse(MESSAGE.OTP_VERIFIED_SUCCESSFULLY, { token }));
	} catch (error) {
		console.log(error);
		return res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR, CONSTANTS.ERROR_TYPES.INTERNAL_SERVER_ERROR));
	}
};

module.exports = userController;
