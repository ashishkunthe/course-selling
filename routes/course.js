const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/courses", (req, res) => {});

courseRouter.post("/purchase", (req, res) => {});

module.exports = {
  courseRouter: courseRouter,
};
