const express = require("express");
const router = express.Router();
const { UserSchema } = require("../models/user/User.schema");
const {userAuthorization} = require("../middlewares/authorization.middleware")

const { setPasswordResetPin } = require("../models/resetPin/ResetPinModel");

const {
  createUser,
  getUserByEmail,
  getUserById,
} = require("../models/user/User.model");
const { emailProcessor } = require("../helpers/email.helper");

//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from user router" });
  next();
});


// GET USER PROFILES
router.get ("/", userAuthorization, async(req, res)=>{
  
  // 1,2,3 have been in the userAuthorization middleware.
  // 4. Get user profile based on the user_id
  const id = req.userId
  
  try {
    await getUserById(id, res)
    // return res.json({id});
  }catch (err) {
    console.log(err);
    res.json({status: 'error', message: err.message})
  }
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




// RESET PASSWORD
router.post ("/reset-password", async (req, res)=> {
  const {email} = req.body;
  const user = await UserSchema.findOne({email});

  // Check if user exist for the email
  if (user && user._id) {
    // Create unique 6 digits pin
    const setPin = await setPasswordResetPin(email);
    await emailProcessor({
			email,
			pin: setPin.pin,
		});
  }
  
  res.json({
		status: "success",
		message:
			"If the email exists in our database, the password reset pin will be sent shortly.",
	});
})


module.exports = router;
