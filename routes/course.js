const { Router } = require("express");
const userAuth = require("../middleware/userAuth");
const { PurchaseModel, CourseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", userAuth, async (req, res) => {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await PurchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "you have successfully bought course",
  });
});

courseRouter.get("/preview", async (req, res) => {
  const courses = await CourseModel.find({});

  res.json({
    courses: courses,
  });
});

module.exports = {
  courseRouter: courseRouter,
};
