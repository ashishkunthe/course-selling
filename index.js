const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();

app.use(express.json());
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://ashish:9480916537@cluster0.0zkoh.mongodb.net/course-selling"
  );
  app.listen(3000);
}

main();
