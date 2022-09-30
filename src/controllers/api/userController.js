const bcrypt = require("bcrypt");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const {SECRET_KEY, generateToken} = require("../../middlewares/auth");


register = async (req, res) => {
    try {
        let user = req.body;
        let username = await User.findOne({username: user.username});
        if (!username) {
            user.password = await bcrypt.hash(user.password, 10);
            let users = await User.create(user);
            res.status(201).json(users);
        } else {
            res.status(500).send({errMessage: 'Your account existed!'})
        }
    } catch (err) {
        console.log(err)
    }
}

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
            console.log(comparePassword)
            if (!comparePassword) {
                res.status(401).json({
                    message: "password is wrong",
                });
            } else {
                console.log("1")
                let payload = {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                };
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn: 36000 * 36000 * 100,
                });

                console.log(token)
                res.status(200).json({
                    token: token
                });
            }
        }
    } catch (err) {
        console.log("error")
    }

};
getUserProfile = async (req, res) => {
    const user = await User.findById(req.body._id);
    try {
        // console.log('aaa')
        if (user){
            console.log(user)
            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
                fullName: user.fullName,
                avatar: user.avatar
            })
        }else {
            res.status(404).json({
                success: false,
                msg: 'User not found'
            })
        }
    }catch (error){
        console.log(error)
    }

};
updateUserProfile = async (req, res) => {
    const user = await User.findById(req.body._id);
  try {
      if (user){
          user.username = req.body.username || user.username ;
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

module.exports = {
    register,
    login,
    getUserProfile,
    updateUserProfile
}