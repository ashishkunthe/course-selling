const express = require("express");
const Router = express.Router;

const userRouter = Router();

userRouter.post("/signup", (req, res) => {});

userRouter.post("/login", (req, res) => {});

userRouter.get("/course", (req, res) => {});

userRouter.get("/purchases", (req, res) => {});

module.exports = {
  userRouter: userRouter,
};
