const User = require("../model/usersModel");
const bcrypt = require("bcrypt");

// REGISTER
module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const userNameCheck = await User.findOne({ userName });
    if (userNameCheck)
      return res.json({ msg: "Tên tài khoản đã tồn tại", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck) return res.json({ msg: "Email đã tồn tại", status: false });
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
    });
    delete user.password;
    return res.json({ msg: "Đăng kí thành công", status: true, user });
  } catch (error) {
    next(error);
  }
};

// LOGIN
module.exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.json({
        msg: "Tài khoản hoặc mật khẩu không chính xác",
        status: false,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({
        msg: "Tài khoản hoặc mật khẩu không chính xác",
        status: false,
      });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

// SETAVATAR
module.exports.setavatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getAllusers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: {$ne :req.params.id} }).select([
      "_id",
      "email",
      "userName",
    ]);
    return res.json({ users });
  } catch (error) {
    next(error);
  }
};
