const express = require("express");
const { Usermodel } = require("../Model/User.Model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  let user = await Usermodel.find();
  res.send(user);
});

userRouter.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  try {
    if (name && password && email) {
      bcrypt.hash(password, 7, async (err, hash_pass) => {
        if (err) {
          console.log(err);
        } else {
          const user = new Usermodel({
            name,
            password: hash_pass,
            email,
            uniqueId: Date.now(),
          });
          await user.save();
          res.send({ message: "Register Successfull", success: 0 });
        }
      });
    } else {
      res.send({ message: "Please Fill All required fields", success: 1 });
    }
  } catch (err) {
    res.send({ message: "somthing went wrong", success: 1 });
    console.log(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const data = await Usermodel.find({ email });
    console.log(data);
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (result) {
          res.send({
            message: "User Logged in Successfull",
            userId: data[0].uniqueId,
            success: 0,
          });
        } else {
          res.send({ message: "Wrong password", success: 1 });
        }
      });
    } else {
      res.send({ message: "Data Was Not Found", success: 1 });
    }
  } catch (err) {
    res.send({ message: "Somthing Went Wrong", success: 1 });
  }
});

module.exports = { userRouter };
