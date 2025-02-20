const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  const response = jwt.verify(token, secret);

  if (response) {
    req.adminId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "invalid credentials",
    });
  }
}

module.exports = {
  adminAuth: adminAuth,
};
