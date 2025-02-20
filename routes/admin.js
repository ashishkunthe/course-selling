const { Router, response } = require("express");
const { AdminModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const hashedPassword = await bcrypt.hash(password, 5);

  await AdminModel.create({
    email: email,
    password: hashedPassword,
    username: username,
  });

  res.json({
    message: "you are signed up ",
  });
});

adminRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await AdminModel.findOne({
    email: email,
  });

  if (!response) {
    return res.json({
      message: "user not found",
    });
  }

  const passwordIsValid = await bcrypt.compare(password, response.password);

  if (passwordIsValid) {
    const token = jwt.sign({ id: response._id }, secret);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});

adminRouter.post("/", (req, res) => {});

adminRouter.put("/", (req, res) => {});

adminRouter.get("/bulk", (req, res) => {});

module.exports = {
  adminRouter: adminRouter,
};
