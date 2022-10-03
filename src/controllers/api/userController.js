const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const {SECRET_KEY, generateToken} = require("../../middlewares/auth");
require ("dotenv")
const Process = require("process");
const nodemailer = require("nodemailer");
const otpModel = require("../../models/otp");

register = async (req, res) => {
  try {
    let user = req.body;
    console.log(user)
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
        console.log("1");
        let payload = {
          id: user._id,
          username: user.username,
          role: user.role,
        };
        let token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: 36000 * 36000 * 100,
        });

        // console.log(token);
        res.status(200).json({
          token: token,
        });
      }
    }
  } catch (err) {
    console.log("error");
  }
};
getUserProfile = async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    // console.log('aaa')
    if (user) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        avatar: user.avatar,
      });
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
  const user = await User.findOne({ username: req.body.username });
  try {
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.address = req.body.address || user.address;
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
      user.fullName = req.body.fullName || user.fullName;
      user.avatar = req.body.avatar || user.avatar;

          const updateUser = await user.save();
          res.json(
              updateUser
          )

      }else {
          res.status(404).json({
              success: false,
              msg: 'User not found'
          })
      }
  }catch (error){
      console.log(error)
  }
}
forgotPassword = async (req, res)=>{
  const {email} = req.body;
  User.findOne({email},(err, user)=>{

  })

}

sendOTP = async (req,res)=>{
  let OTP = Math.random();
  OTP = Math.round(OTP*1000000);
  const user = await User.findOne({email : req.body.email})

  if(user) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service : 'Gmail',

      auth: {
        user: "hanguyen18052004@gmail.com",
        pass: Process.env.PASSWORD_MAIL,
      }
    });
    let mailOptions = {
      to: req.body.email,
      subject: "Otp for registration is: ",
      html: "<h3>OTP for account verification is </h3>" + "<h1 style='font-weight:bold;'>" + OTP + "</h1>" // html body
    };

    await transporter.sendMail(mailOptions, async(error, info) => {
      if (error) {
        return res.json(error);
      }
      const newOTP = new otpModel({
        email: req.body.email,
        otp: OTP
      });
      await newOTP.save();
      res.json("Please check email to get OTP")
    });
  }else {
    res.json("User is not exist");
  }


}

checkOTP = async (req, res) => {
  const otpMail = await otpModel.findOne({email: req.body.email});
  const user = await User.findOne({email: req.body.email});
  // const password = await bcrypt.getRounds(user.password);
    if(otpMail && otpMail.otp === req.body.otp){
      res.json(user.password);
    }else {
      res.json("OTP is expired");
    }
}

changePassword = async (req, res) => {
  const user = await User.findById(req.body.id);
  if(user){
    let comparePassword = await bcrypt.compare(req.body.password, user.password);
    if(comparePassword){
      user.password = await bcrypt.hash(req.body.newPassword, 10);
      await user.save();
      res.json("Change password successfully")
    }else{
      res.json("Wrong password");
    }
  }else {
    res.json("User is not exist");
  }
}

module.exports = {
  register,
  login,
  getUserProfile,
  updateUserProfile,
  sendOTP,
  checkOTP,
  changePassword
}