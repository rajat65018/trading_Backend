const {
  generateToken,
  generateHash,
  compareHash,
} = require("../helper/commonFunction");
const bcrypt=require('bcrypt');
const { findOneSession, createSession } = require("../services/sessoinService");
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
} = require("../utils/messages");

const userController = {};
userController.signup = async (req, res) => {
  try {
    const payload = req.body;
    let user = await findOneUser({ email: payload.email });
    if (user) {
      return res.status(403).json({ message: USER_ALREADY_EXIST });
    }
    payload.password = await generateHash(payload.password);
    user = await createUser(payload);
    const token = generateToken({ _id: user._id });
    const session = {
      userId: user._id,
      token: token,
      userType: "user",
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
    const user = await findOneUser({ email: payload?.email });
    const password = await bcrypt.compare(payload.password, user.password);
    if (!user && !password) {
      return res.status(401).json({ message: INVALID_CREDENTIALS });
    }
    const session = await findOneSession({ userId: user._id });
    res.status(200).json(session);
  } catch (error) {
    console.log(error,'error');
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    const userId = req.body.session.userId;
    await findOneAndUpdateUser({ _id: userId }, updateData);
    res.status(200).json({ message: USER_DATA_UPDATED });
  } catch (error) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    console.log("hello");
    const userId = req.body.session.userId;
    console.log(userId);
    await findOneAndUpdateUser(
      { _id: userId, isDeleted: false },
      { $set: { isDeleted: true } }
    );
    res.status(200).json({ message: USER_DELETED_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

module.exports = userController;
