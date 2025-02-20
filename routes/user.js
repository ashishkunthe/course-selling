const express = require("express");
const Router = express.Router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../db");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const hashedPassword = bcrypt.hash(password, 5);

  await UserModel.create({
    email: email,
    password: hashedPassword,
    username: username,
  });
  res.json({
    message: "the user is signed up",
  });
});

userRouter.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const response = await UserModel.findOne({
    email: email,
  });

  if (!response) {
    res.json({
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
      message: "invalid credentials",
    });
  }
});

userRouter.get("/course", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = {
  userRouter: userRouter,
};
