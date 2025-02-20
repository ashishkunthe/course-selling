const { Router } = require("express");
const { AdminModel } = require("../db");

const adminRouter = Router();

adminRouter.post("/signup", (req, res) => {});

adminRouter.post("/login", (req, res) => {});

adminRouter.post("/course", (req, res) => {});

adminRouter.get("/course", (req, res) => {});

module.exports = {
  adminRouter: adminRouter,
};
