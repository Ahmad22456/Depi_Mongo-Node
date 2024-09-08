const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hashSync(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    res
      .status(201)
      .json({ message: "User has been created successfully", user: newUser });
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) res.status(400).json({ message: "invalid email or password" });
    if (user) {
      const matchPassword = bcrypt.compareSync(password, user.password);
      if (matchPassword) {
        const token = await jwt.sign(
          { user_id: user._id },
          process.env.JWT_KEY
        );
        res.status(200).json({
          message: "User successfully logged in",
          token,
        });
      } else {
        res.status(400).json({ message: "invalid email or password" });
      }
    }
  } catch (e) {
    next(e);
  }
};

exports.listAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      data: users,
    });
  } catch (e) {
    next(e);
  }
};
