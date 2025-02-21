const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");

function adminAuth(req, res, next) {
  const token = req.headers.authorization;
  const response = jwt.verify(token, JWT_ADMIN_SECRET);

  if (response) {
    req.adminId = response.id;
    next();
  } else {
    res.status(403).json({
      message: "you are not signed in ",
    });
  }
}

module.exports = {
  adminAuth: adminAuth,
};
