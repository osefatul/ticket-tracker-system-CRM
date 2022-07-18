const express = require("express");
const router = express.Router();
const { UserSchema } = require("../models/user/User.schema");
const {userAuthorization} = require("../middlewares/authorization.middleware")
const { hashPassword} = require("../helpers/bcrypt.helper");
const { emailProcessor } = require("../helpers/email.helper");
const {client} = require("../helpers/redis.helper")
const {storeUserRefreshJWT} = require("../helpers/jwt.helper")
const { setPasswordResetPin, getPinByEmail, deletePin } = require("../models/resetPin/ResetPinModel");


const {
	resetPasswordReqValidation,
	updatePasswordValidation,

} = require("../middlewares/formValidation.middleware");

const {
  createUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  // storeUserRefreshJWT
} = require("../models/user/User.model");


//Used to load middleware functions at a path ("/") for all HTTP request methods.
router.all("/", (req, res, next) => {
  // res.json({ message: "return from user router" });
  next();
});



// ----------------------------------------------------------------------------


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



// GET USER PROFILES
router.get ("/", userAuthorization, async(req, res)=>{
  
  // 1,2,3 have been in the userAuthorization middleware.
  // 4. Get user profile based on the user_id
  const id = req.userId
  
  try {
    await getUserById(id, res)
  }catch (err) {
    console.log(err);
    res.json({status: 'error', message: err.message})
  }
})



// RESET AND UPDATE PASSWORD
//A: RESET PASSWORD
router.post ("/reset-password", resetPasswordReqValidation, async (req, res)=> {
  const {email} = req.body;
  const user = await UserSchema.findOne({email});

  // Check if user exists for the email
  if (user?._id) {
    // Create unique 6 digits pin
    const setPin = await setPasswordResetPin(email);

    await emailProcessor({
			email,
			pin: setPin.pin,
      type: "request-new-password" 
		});
  }
  else{
    return res.status(404).json({ message: "User not found" });
  }
  
  return res.json({
		status: "success",
		message:
			"The password reset pin will be sent shortly.",
	});
})





//B: UPDATE RESET PASSWORD
router.patch ("/reset-password", updatePasswordValidation, async (req, res)=> {
  
  //1- Received email and pin..
  const {email, pin, newPassword} = req.body;

  //Retrieve Pin object from MongoDB.
  const getPin = await getPinByEmail(email, pin)

  //2- Validate pin
  if(getPin?._id){

    const dbDate = getPin.addedAt;
    const expiresIn = 1; //expiry data shouldn't be more than 1 day.

    let expDate = dbDate.setDate(dbDate.getDate() + expiresIn);
		const today = new Date();

		if (today > expDate) {
			return res.json({ status: "error", message: "Invalid or expired pin." });
		}

    //3- Encrypt new Password.
    const hashedPass = await hashPassword(newPassword);
    //4- Updated DB
    const user = await updatePassword(res, email, hashedPass);
    
    if (user._id) {
			//5- send email notification
			await emailProcessor({ email, type: "update-password-success" });

			//6- delete pin from db
			deletePin(email, pin);

			return res.json({
				status: "success",
				message: "Your password has been updated",
			});
		}
	}

	res.json({
		status: "error",
		message: "Unable to update your password. plz verify your pin or email address",
	});

})





//USER LOGOUT
router.delete("/logout", userAuthorization, async (req, res) => {
  const {authorization} = req.headers;

  //Data coming form DB
  const id = req.userId;

  //delete accessJWT from redis database
  authorization && client.del(authorization);

  //delete refreshJWT from mongoDB
  const result = await storeUserRefreshJWT(id, "");
  
  if(result._id){
    return res.json({status:"success", message:"Logged out successfully"});
  }

  res.json({
		status: "error",
		message: "Unable to log you out, plz try again later",
	});

})







module.exports = router;
