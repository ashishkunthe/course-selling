const { Router } = require("express");
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
    courseId: course._id,
  });
});

adminRouter.put("/course", adminAuth, async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price, imageUrl, courseId } = req.body;

  const course = await CourseModel.updateOne(
    { _id: courseId, creatorId: adminId },
    {
      title: title,
      description: description,
      price: price,
      imageUrl: imageUrl,
    }
  );

  if (!course) {
    return res
      .status(404)
      .json({ message: "Course not found or unauthorized" });
  }

  res.json({
    message: "updated sucessfully",
    courseId: course._id,
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
