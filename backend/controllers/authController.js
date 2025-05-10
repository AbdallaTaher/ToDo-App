const { message } = require("antd");
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_SECRET;

//Registeration function
async function registerUser(req, res) {
  const { firstName, lastName, userName, password } = req.body;
  try {
    const dublicate = await User.find({ userName });
    if (dublicate && dublicate.length > 0) {
      return res.status(400).send({ message: "User already registered" });
    }
    let user = new User({ firstName, lastName, userName, password });
    const result = await user.save();
    console.log(result);
    return res.status(201).send({ message: "User registered Succcesssfully" });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
}

//Login function
async function loginUser(req, res) {
  const { userName, password } = req.body;
  try {
    const user = await User.findOne({ userName });
    if (!user)
      return res
        .status(400)
        .send({ message: "The user doesn't exist , please sign up" });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Wrong password" });
    }
    let token = jwt.sign({ userId: user?._id }, secretKey, { expiresIn: "1h" });

    let finalData = {
      userId: user?._id,
      userName: user?.userName,
      firstName: user?.firstName,
      last: user?.lastName,
      token,
    };
    res.send(finalData);
  } catch (err) {
    console.log("Login Error", err);
    res.status(400).send({ message: "Error in logging in " });
  }
}

const AuthController = {
  registerUser,
  loginUser,
};

module.exports = AuthController;
