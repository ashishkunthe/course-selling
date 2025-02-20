const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
  email: { type: String, unique: true },
  password: String,
  username: String,
});

const Admin = new Schema({
  email: { type: String, unique: true },
  password: String,
  username: String,
});

const Courses = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const Purchase = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const UserModel = mongoose.model("user", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("course", Courses);
const PurchaseModel = mongoose.model("purchase", Purchase);

module.exports = {
  UserModel: UserModel,
  AdminModel: AdminModel,
  CourseModel: CourseModel,
  PurchaseModel: PurchaseModel,
};
