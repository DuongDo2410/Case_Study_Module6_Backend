const jwt = require("jsonwebtoken");
const { nextTick } = require("process");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "30d",
  });
};

const SECRET_KEY = "duckies";
const auth = (req, res, next) => {
  let authorization = req.headers.authorization;
  if (authorization) {
    let accessToken = authorization.split(" ")[1];
    if (!accessToken) {
      res.status(401).json({
        message: "you are anonymous",
      });
    } else {
      jwt.verify(accessToken, process.env.SECRET_KEY, (err, data) => {
        if (err) {
          res.status(401).json({
            error: err.message,
            message: "you are anonymous",
          });
        } else {
          req.decoded = data;
          next();
        }
      });
    }
  } else {
    res.status(401).json({
      message: "you are anonymous",
    });
  }
};

module.exports = {
  auth,
  generateToken,
};
