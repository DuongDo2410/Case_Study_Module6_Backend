const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { SECRET_KEY, generateToken } = require("../../middlewares/auth");
require("dotenv");
const Process = require("process");
const nodemailer = require("nodemailer");
const otpModel = require("../../models/otp");
const BookingController = require("./home/booking");
const DayController = require("./home/dayController");

register = async (req, res) => {
  try {
    let user = req.body;
    let username = await User.findOne({ username: user.username });
    if (!username) {
      user.password = await bcrypt.hash(user.password, 10);
      let users = await User.create(user);
      res.status(201).json(users);
    } else {
      res.status(500).send({ errMessage: "Your account existed!" });
    }
  } catch (err) {
    console.log(err);
  }
};

login = async (req, res) => {
  try {
    let loginForm = req.body;
    let user = await User.findOne({
      username: loginForm.username,
    });
    if (!user) {
      res.status(401).json({
        message: "username is not existed",
      });
    } else {
      let password = user.password;
      let comparePassword = await bcrypt.compare(loginForm.password, password);
      if (!comparePassword) {
        res.status(401).json({
          message: "password is wrong",
        });
      } else {
        let payload = {
          id: user._id,
          role: user.role,
        };
        let currentUser = {
          id: user._id,
          fullName: user?.fullName,
          username: user?.username,
          avatar: user?.avatar,
          role: user?.role,
          phoneNumber: user?.phoneNumber,
          email: user?.email,
          address: user?.address,
        };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 36000 * 36000 * 100,
        });
        res.status(200).json({
          token: token,
          user: currentUser,
        });
      }
    }
  } catch (err) {
    console.log("error");
  }
};
loginWithGoogle = async (req, res, next) => {
  try {
    let data = req.body;
    let checkUser = await User.findOne({ idGoogle: data.googleId });

    if (!checkUser) {
      let user = {
        idGoogle: data.googleId,
        email: data.email,
        fullName: data.name,
        avatar: data.imageUrl,
        address: data.address,
      };
      checkUser = await User.create(user);
    }
    let payload = {
      id: checkUser._id,
      fullName: checkUser.username,
      role: checkUser.role,
    };
    let token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 36000 * 36000 * 100,
    });
    res.status(200).json({
      token: token,
      user: checkUser,
    });
  } catch (err) {
    console.log(err);
  }
};
getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.decoded.id);
    if (user) {
      let currentUser = {
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role,
        phoneNumber: user.phoneNumber,
        email: user.email,
        address: user.address,
      };
      res.status(200).json(currentUser);
    } else {
      res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
updateUserProfile = async (req, res) => {
  try {
    let id = req.decoded.id;
    const user = await User.findOne({ _id: id });
    if (user) {
      let data = req.body;
      console.log(data);
      let newUser = await User.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      let currentUser = {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        avatar: newUser.avatar,
        role: newUser.role,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        address: newUser.address,
      };
      res.status(200).json(currentUser);
    } else {
      res.status(404).json({
        success: false,
        msg: "User not found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
changePassword = async (req, res) => {
  let user = await User.findById(req.decoded.id);
  if (user) {
    let comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (comparePassword) {
      user.password = await bcrypt.hash(req.body.newPassword, 10);
      await user.save();
      return res.status(200).json("Change password successfully");
    } else {
      res.json("Wrong password");
    }
  } else {
    res.json("User is not exist");
  }
};
forgotPassword = async (req, res) => {
  const { email } = req.body;
  User.findOne({ email }, (err, user) => {});
};

sendOTP = async (req, res) => {
  let OTP = Math.random();
  OTP = Math.round(OTP * 1000000);
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "Gmail",

      auth: {
        user: "hanguyen18052004@gmail.com",
        pass: Process.env.PASSWORD_MAIL,
      },
    });
    let mailOptions = {
      to: req.body.email,
      subject: "Otp for registration is: ",
      html:
        "<h3>OTP for account verification is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        OTP +
        "</h1>", // html body
    };

    await transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return res.json(error);
      }
      const newOTP = new otpModel({
        email: req.body.email,
        otp: OTP,
      });
      await newOTP.save();
      res.json("Please check email to get OTP");
    });
  } else {
    res.json("User is not exist");
  }
};

checkOTP = async (req, res) => {
  const otpMail = await otpModel.findOne({ email: req.body.email });
  const user = await User.findOne({ email: req.body.email });
  // const password = await bcrypt.getRounds(user.password);
  if (otpMail && otpMail.otp === req.body.otp) {
    res.json(user.password);
  } else {
    res.json("OTP is expired");
  }
};

getStatistics = async (req, res) => {
  try {
    const id = req.decoded.id;
    const bookings = await BookingController.getAll(id);
    const moneyWeek = await BookingController.getBookingByWeek(id);
    const moneyMonth = await BookingController.getBookingByMonth(id);
    return res.status(200).json({
      bookings: bookings,
      moneyWeek: moneyWeek,
      moneyMonth: moneyMonth,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  sendOTP,
  checkOTP,
  changePassword,
  loginWithGoogle,
  getStatistics,
};
