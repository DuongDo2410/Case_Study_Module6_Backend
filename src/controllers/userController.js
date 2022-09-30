const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../middlewares/auth");


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
                let comparePassword = await bcrypt.compare( loginForm.password, password);
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
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY , {
                        expiresIn: 36000 * 36000 * 100,
                    });

                    console.log(token)
                    res.status(200).json({
                        token: token
                    });
                }
            }
        } catch (err) {
        }

}

module.exports = {
    register,
    login
}