const User = require("../model/usersModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    console.log(req.body);
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
    return res.json({ msg: "Đăng kí thành công", status: true ,user});
  } catch (error) {
    next(error);
  }
};
