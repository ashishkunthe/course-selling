const express = require("express");
const Router = express.Router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, PurchaseModel, CourseModel } = require("../db");
const { JWT_USER_SECRET } = require("../config");
const userAuth = require("../middleware/userAuth");

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    await UserModel.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
  } catch (e) {
    res.json({ message: "not able to signup" + e });
  }
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
    const token = jwt.sign({ id: response._id }, JWT_USER_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "invalid credentials",
    });
  }
});

userRouter.get("/purchases", userAuth, async (req, res) => {
  const userId = req.userId;

  const purchases = await PurchaseModel.find({
    userId,
  });

  const courseData = await CourseModel.find({
    _id: { $in: purchases.map((x) => x.courseId) },
  });

  res.json({
    purchases: purchases,
    courseData: courseData,
  });
});

module.exports = {
  userRouter: userRouter,
};
