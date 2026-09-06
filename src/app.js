const express = require("express");
const User = require("./models/user");
const { connectDB } = require("./config/database");
const { AdminAuth, UserAuth } = require("./middlewares/auth");
const UserModel = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signUp", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User Added Successfully");
  } catch (err) {
    res.status(500).send("Something Went Wrong");
  }
});

app.get("/getUserByEmail", async (req, res) => {
  console.log(req?.body?.email, "request");
  const userEmail = req?.body?.email;

  try {
    const foundUser = await UserModel.find({ email: userEmail });
    console.log("foundUser", foundUser);
    if (foundUser.length > 0) {
      res.send(foundUser);
    } else {
      res.send("No User Found with this email");
    }
  } catch {
    res.send("Something went wrong");
  }
});

//get All Users

app.get("/getAllUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    if (users.length === 0) {
      res.status(404).send("No Users Found");
    } else {
      res.status(200).send(users);
    }
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//deleteUserById

app.delete("/deleteUserById", async (req, res) => {
  const userId = req?.body?.id;

  try {
    const isDeleted = await UserModel.findByIdAndDelete(userId);
    console.log(isDeleted, "isDeleted");
    if (isDeleted) {
      res.status(200).send("User has been deleted successfully");
    } else {
      res.status(400).send("Failed to delete the user");
    }
  } catch {
    res.status(400).send("Something went wrong");
  }
});

//updateUser

app.patch("/updateUserById", async (req, res) => {
  const updateData = req?.body;
  const userId = req?.query?.userId;
  console.log(userId, "user", updateData);

  try {
    const updation = await UserModel.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    });
    console.log(updation, "upd");
    if (updation) {
      res.status(200).send("User Updated Successfully");
    } else {
      res.status(404).send("Failed to update the user");
    }
  } catch {
    res.status(500).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection Established Successfully");
    app.listen(3000, () => {
      console.log("App is listening to port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected");
  });
