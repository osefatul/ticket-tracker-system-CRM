const express = require("express");
const router = express.Router();

const {
  createUser,
  getUserByEmailnPassword,
} = require("../models/user/User.model");

//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from user router" });
  next();
});

//RGISTER A NEW USER
router.post("/", async (req, res) => {
  try {
    await createUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

//LOGIN USER
router.get("/login", async (req, res) => {
  try {
    await getUserByEmailnPassword(req, res);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

module.exports = router;
