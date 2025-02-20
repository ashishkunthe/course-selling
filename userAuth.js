const jwt = require("jsonwebtoken");

function userAuth(req, res, next) {
  const token = req.headers.authorization;
  const response = jwt.verify(token, secret);

  if (response) {
    req.userId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "invalid credentials",
    });
  }
}

module.exports = {
  userAuth: userAuth,
};
