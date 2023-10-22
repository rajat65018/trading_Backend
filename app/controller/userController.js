const {
  generateToken,
  generateHash,
  compareHash,
  decryptToken,
  generateOtp,
  sendEmail,
} = require("../helper/commonFunction");
const bcrypt = require("bcrypt");
const {
  findOneSession,
  createSession,
  findOneAndDeleteSession,
  findOneAndUpdateSession,
} = require("../services/sessoinService");
const {
  findOneUser,
  createUser,
  findOneAndUpdateUser,
} = require("../services/userService");
const {
  USER_ALREADY_EXIST,
  INTERNAL_SERVER_ERROR,
  USER_DELETED_SUCCESSFULLY,
  USER_DATA_UPDATED,
  INVALID_CREDENTIALS,
  INVALID_PASSWORD,
  PASSWORD_UPDATED_SUCCESSFULLY,
  OTP_SENT_SUCCESSFULLY,
  OTP_VERIFIED_SUCCESSFULLY,
  INVALID_OTP,
} = require("../utils/messages");
const { tokenType } = require("../utils/constants");
const { findOneAndUpdate } = require("../models/sessionModel");
const { response } = require("express");

const userController = {};
userController.signup = async (req, res) => {
  try {
    const payload = req.body;
    let user = await findOneUser({ email: payload.email, isDeleted: false });
    if (user) {
      return res.status(403).json({ message: USER_ALREADY_EXIST });
    }
    payload.password = await generateHash(payload.password);
    user = await createUser(payload);
    const token = generateToken({ _id: user._id });
    const session = {
      userId: user._id,
      token: token,
      tokenType: tokenType.USER,
    };
    await createSession(session);
    res.status(200).json(session);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.login = async (req, res) => {
  try {
    const payload = req.body;
    console.log(req.body);
    const user = await findOneUser({ email: payload?.email, isDeleted: false });
    if (!user) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }
    const password = await bcrypt.compare(payload.password, user.password);
    if (!(await bcrypt.compare(payload.password, user.password))) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }
    const session = await findOneSession({ userId: user._id });
    res.status(200).json(session);
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    const userId = req.body.session.userId;
    await findOneAndUpdateUser({ _id: userId, isDeleted: false }, updateData);
    return res.status(200).json({ message: USER_DATA_UPDATED });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const userId = req.body.session.userId;
    console.log(userId);
    await findOneAndUpdateUser(
      { _id: userId, isDeleted: false },
      { $set: { isDeleted: true } }
    );
    await findOneAndDeleteSession({ userId: userId });
    res.status(200).json({ message: USER_DELETED_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.changePassword = async (req, res) => {
  try {
    const userId = req.body.session.userId;
    let newPassword = req.body.newPassword;
    const currentPassword = req.body.currentPassword;
    const user = await findOneUser({ _id: userId });
    if (!(await compareHash(currentPassword, user.password))) {
      return res.status(401).json({ message: INVALID_PASSWORD });
    }
    newPassword = await generateHash(req.body.newPassword);
    await findOneAndUpdateUser(
      { _id: userId },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    res.status(200).json({ message: PASSWORD_UPDATED_SUCCESSFULLY });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.sendOtp = async (req, res) => {
  try {
    const email = req.body.email;
    const otp = generateOtp();
    const token = generateToken({ otp: otp });
    const session = req.body.session;
    const otpTokenExist = await findOneSession({
      userId: session.userId,
      tokenType: tokenType.OTP,
    });
    if (otpTokenExist) {
      await findOneAndUpdateSession(
        { userId: session.userId, tokenType: tokenType.OTP },
        {
          $set: {
            token: token,
          },
        }
      );
      console.log("token", token);
    } else {
      const sessionObj = {
        userId: session.userId,
        token: token,
        tokenType: tokenType.OTP,
      };
      await createSession(sessionObj);
    }
    const data = {
      email: email,
      subject: "Otp for the email verification",
      message: `Your Otp for the email verification is ${otp}`,
    };
    req.body.data = data;
    await sendEmail(req, res);
    // await createSession(sessionObj);
    res.status(200).json({ message: OTP_SENT_SUCCESSFULLY });
  } catch (error) {
    console.log(error, "eroro");
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.verifyOtp = async (req, res) => {
  try {
    const otp = req.body.otp;
    const userId = req.body.session.userId;
    const otpToken = await findOneSession({
      userId: userId,
      tokenType: tokenType.OTP,
    });
    if (!otpToken) {
      res.status(400).json({ message: INVALID_OTP });
    } else {
      const decryptOtp = await decryptToken(otpToken.token);
      console.log(decryptOtp, "decryptOpt========");
      if (otp == decryptOtp.otp) {
        await findOneAndUpdateUser(
          { _id: userId },
          {
            $set: { isVerified: true },
          }
        );
        res.status(200).json({ message: OTP_VERIFIED_SUCCESSFULLY });
      } else {
        res.status(400).json({ message: INVALID_OTP });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = userController;
