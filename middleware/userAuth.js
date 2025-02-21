const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");

function userAuth(req, res, next) {
  const token = req.headers.authorization;
  const response = jwt.verify(token, JWT_USER_SECRET);

  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in ",
    });
  }
}

module.exports = userAuth;
