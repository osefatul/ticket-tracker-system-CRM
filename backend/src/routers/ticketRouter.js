const express = require("express");

const router = express.Router();

//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  res.json({ message: "return from ticket router" });
  next();
});

router.get("/", (req, res) => {
  res.status(200).json(req.body);
});

module.exports = router;
