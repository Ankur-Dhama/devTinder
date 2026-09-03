const express = require("express");
const res = require("express/lib/response");
const { AdminAuth, UserAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", AdminAuth);
app.use("/user", UserAuth);

app.get("/admin/getData", (req, res) => {
  res.send("Admin data sent");
});

app.get("/user/getData", (req, res, next) => {
  try {
    throw new Error("Something Went Wrong Please Connect Support");
    res.send({ firstName: "Ankur", lastName: "Dhama" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.use("/hello", (req, res) => {
  res.send("Hello, Hello ,Hello");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("App is listening to port 3000");
});
