const express = require("express");
const router = express.Router();
const {userAuthorization} = require("../middlewares/authorization.middleware")
const {
  createUser,
  getUserByEmail,
} = require("../models/user/User.model");

//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from user router" });
  next();
});




// GET USER PROFILES
router.get ("/", userAuthorization, (req, res)=>{
  
  const dummyUser = {"name": "Sefatullah", "company":"Amazon",
  "Address":"6320skaha", "phone":"78651789",
  "email":"osefatul@amazon.com",
  "password":"sefatOmar"  }

  res.json({dummyUser});

})



//REGISTER A NEW USER
router.post("/", async (req, res) => {
  try {
    await createUser(req, res);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

//LOGIN USER
router.post("/login", async (req, res) => {
  try {
    await getUserByEmail(req, res);
  } catch (err) {
    console.log(err);
    res.json({ status: "error", message: err.message });
  }
});

module.exports = router;
