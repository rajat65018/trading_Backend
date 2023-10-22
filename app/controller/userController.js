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
    await sessionService.createSession({ userId: user._id, token: token, tokenType: CONSTANTS.tokenType.OTP });

    res.status(200).json(createSuccessResponse(MESSAGE.OTP_SENT_SUCCESSFULLY));
  } catch (error) {
    console.log(error);
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
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
      res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
    }
};

userController.login = async (req, res) => {
  try {
    const payload = req.body;

    const user = await userService.findOneUser({ email: payload?.email, isDeleted: { $ne: true }});
    if (!user) {
      return res.status(401).json(createErrorResponse(MESSAGE.USER_NOT_FOUND));
    }

    const password = await bcrypt.compare(payload.password, user.password);
    if (!password) {
		return res.status(401).json(createErrorResponse(MESSAGE.INVALID_CREDENTIALS));
    }
    const session = await sessionService.findOneSession({ userId: user._id });

    res.status(200).json(createSuccessResponse(MESSAGE.USER_LOGIN_SUCCESSFULLY, { user, session }));
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

userController.updateUser = async (req, res) => {
  try {

    let user = await userService.findOneAndUpdateUser({ _id: req.body.session.userId, isDeleted: { $ne: true }}, req.body, { new: true });

    return res.status(200).json(createSuccessResponse(MESSAGE.USER_DATA_UPDATED, user));
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const userId = req.body.session.userId;

    await userService.findOneAndUpdateUser({ _id: userId, isDeleted: { $ne: true } }, { $set: { isDeleted: true } });
    await sessionService.findOneAndDeleteSession({ userId: userId });

    res.status(200).json(createSuccessResponse(MESSAGE.USER_DELETED_SUCCESSFULLY));
  } catch (error) {
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

userController.changePassword = async (req, res) => {
  try {
    const userId = req.body.session.userId;
    let newPassword = req.body.newPassword;
    const currentPassword = req.body.currentPassword;
    const user = await userService.findOneUser({ _id: userId });
    if (!(await commonFunction.compareHash(currentPassword, user.password))) {
      return res.status(401).json({ message: MESSAGE.INVALID_PASSWORD });
    }

    newPassword = await commonFunction.generateHash(req.body.newPassword);
    await userService.findOneAndUpdateUser(
      { _id: userId },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    res.status(200).json({ message: MESSAGE.PASSWORD_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.log(error, 'error');
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

userController.sendOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = commonFunction.generateOtp();
    const token = commonFunction.generateToken({ otp: otp });
    const session = req.body.session;
    const otpTokenExist = await sessionService.findOneSession({ userId: session.userId, tokenType: CONSTANTS.tokenType.OTP });
    if (otpTokenExist) {
      await sessionService.findOneAndUpdateSession(
        { userId: session.userId, tokenType: CONSTANTS.tokenType.OTP },
        {
          $set: {
            token: token,
          },
        }
      );
    } else {
      await sessionService.createSession({ userId: session.userId, token: token, tokenType: CONSTANTS.tokenType.OTP });
    }
    const data = { email: email, subject: 'Otp for the email verification', message: `Your Otp for the email verification is ${otp}` };
    req.body.data = data;
    await commonFunction.sendEmail(req, res);
    // await sessionService.createSession(sessionObj);
    res.status(200).json({ message: MESSAGE.OTP_SENT_SUCCESSFULLY });
  } catch (error) {
    console.log(error, 'eroro');
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

userController.verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const userId = req.body.session.userId;
    const otpToken = await sessionService.findOneSession({
      userId: userId,
      tokenType: CONSTANTS.tokenType.OTP,
    });
    if (!otpToken) {
      res.status(400).json({ message: MESSAGE.INVALID_OTP });
    } else {
      const decryptOtp = await commonFunction.decryptToken(otpToken.token);

      if (otp == decryptOtp.otp) {
        await userService.findOneAndUpdateUser(
          { _id: userId },
          {
            $set: { isVerified: true },
          }
        );
        res.status(200).json({ message: MESSAGE.OTP_VERIFIED_SUCCESSFULLY });
      } else {
        res.status(400).json({ message: MESSAGE.INVALID_OTP });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(createErrorResponse(MESSAGE.INTERNAL_SERVER_ERROR));
  }
};

module.exports = userController;
