const { Router, response } = require("express");
const { AdminModel, CourseModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_ADMIN_SECRET } = require("../config");
const adminAuth = require("../middleware/adminAuth");

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
    const token = jwt.sign({ id: response._id }, JWT_ADMIN_SECRET);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Invalid credentials",
    });
  }
});

adminRouter.post("/course", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, imageUrl } = req.body;

  const course = await CourseModel.create({
    title,
    description,
    price,
    imageUrl,
    creatorId: adminId,
  });

  res.json({
    message: "course created",
    couseId: course._id,
  });
});

adminRouter.put("/course", adminAuth, async (req, res) => {
  const { title, description, price, imageUrl, courseId } = req.body.courseId;
  const findCourse = await CourseModel.findOne({
    courseId,
  });

  if (findCourse) {
    findCourse.updateOne({
      title,
      description,
      price,
      imageUrl,
    });
  }
  res.json({
    message: "updated sucessfully",
  });
});

adminRouter.get("/bulk", adminAuth, async (req, res) => {
  const adminId = req.adminId;

  const courses = await CourseModel.findOne({
    creatorId: adminId,
  });

  res.json({
    courses: courses,
  });
});

module.exports = {
  adminRouter: adminRouter,
};
