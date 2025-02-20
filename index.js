const express = require("express");

const app = express();

app.post("/user/signup", (req, res) => {});

app.post("/user/login", (req, res) => {});

app.post("/user/course", (req, res) => {});

app.get("/user/course", (req, res) => {});

app.get("/user/purchasedCourse", (req, res) => {});

app.listen(3000);
