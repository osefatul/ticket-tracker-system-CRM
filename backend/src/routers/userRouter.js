const express = require("express");
const router = express.Router();

const { insertUser } = require("../models/user/User.model");

//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from user router" });
  next();
});

//POST
router.post("/", async (req, res) => {
  try {
    await insertUser(req.body, res);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

module.exports = router;
