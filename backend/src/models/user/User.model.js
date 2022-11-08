const { UserSchema } = require("./User.schema");
const { TicketSchema } = require("../ticket/Ticket.schema");

const bcrypt = require("bcrypt");
const { emailProcessor } = require("../../helpers/email.helper");

const {
  createAccessJWT,
  createRefreshJWT,
} = require("../../helpers/jwt.helper");
const generateAuthToken = require("../../helpers/generateAuthToken");


//--------------------------------------------------------------------
// const verificationURL = "https://advanced-ticketing-system.netlify.app/verification/";
const verificationURL = "http://localhost:3000/verification/";

//--------------------------------------------------------------------

//REGISTRATION
//Create a new user profile
const createUser = async (req, res) => {
  const { name, company, address, department, email, password, confirmPassword } = req.body;

  //Fill up all details in the inputs
  if (!name || !company || !department || !email || !password || !confirmPassword) {
    res
      .status(422)
      .json({ error: "Please fill up the details" });
  }

  // Check Password length
  if (password.length < 8) {
    return res.status(422).json({
      error: "Password should be or more than 8 characters" 
    });
  }

  if(password !== confirmPassword) {
    return res.status(422).json({
      error: "Passwords do not match" 
    });
  }

  //Encrypt the password
  //Number indicates more time to take to generated random string
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Check if email or phone already exists
  const userExist = await UserSchema.findOne({
    $or: [{ email: email }, { name: name }],
  });

  if (userExist) {
    return res
      .status(422)
      .json({  error: "User Already Exists"  });
  }

  try {
    const newUser = await new UserSchema({
      name,
      company,
      address,
      department,
      email,
      password: hashPassword,
    });

    const result = await newUser.save();

    //Sending email to verify user.
    emailProcessor({
			email,
			type: "new-user-confirmation-required",
			verificationLink: verificationURL + "/" + email,
		});
    

    console.log(result);
    res.status(200).json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
}
};


//--------------------------------------------------------------------

// Get user data from database using its email - PURPOSE: LOGIN
const getUserByEmail = async (req, res) => {
  
  const { email } = req.body;
  
  try {
  //Check if email exists
  const user = await UserSchema.findOne({ email });
  !user && res.status(404).json({ message: "User not found" });

  if(!user.isVerified){
    return res.status(404).json({ message: "Please check your email for verification code..." });
  }

  //Check if passwords match
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  !validPassword && res.status(404).json({ message: "Wrong Password" });

  const token = generateAuthToken(user)
  const { password, ...otherDetails } = user._doc;

    return res.status(200)
      .json({ message: "Login successfully",  user: { ...otherDetails }, accessJwtToken: token} );
  } catch (error) {
    console.log(error);
  }
};



//--------------------------------------------------------------------


// Get user data from database using its email - PURPOSE: Demo LOGIN
const getDemoAdminUserByEmail = async (req, res) => {
  const email = "Demo@gmail.com";
  const bodyPassword = "Password5%"
  
  
  try {
  //Check if email exists
  const user = await UserSchema.findOne({ email });
  !user && res.status(404).json({ message: "User not found" });

  if(!user.isVerified){
    res.status(404).json({ message: "Please check your email for verification code..." });
  }

  //Check if passwords match
  const validPassword = await bcrypt.compare(bodyPassword, user.password);
  !validPassword && res.status(404).json({ message: "Wrong Password" });

  const token = generateAuthToken(user)
  const { password, ...otherDetails } = user._doc;

    return res.status(200)
      .json({ message: "Login successfully",  user: { ...otherDetails }, accessJwtToken: token} );
  } catch (error) {
    console.log(error);
  }
};




//--------------------------------------------------------------------


// Get user data from database using its email - PURPOSE: Demo LOGIN
const getDemoNonAdminUserByEmail = async (req, res) => {
  const email = "DemoUser@gmail.com";
  const bodyPassword = "Password5%"
  
  
  try {
  //Check if email exists
  const user = await UserSchema.findOne({ email });
  !user && res.status(404).json({ message: "User not found" });

  if(!user.isVerified){
    res.status(404).json({ message: "Please check your email for verification code..." });
  }

  //Check if passwords match
  const validPassword = await bcrypt.compare(bodyPassword, user.password);
  !validPassword && res.status(404).json({ message: "Wrong Password" });

    const token = generateAuthToken(user)
  const { password, ...otherDetails } = user._doc;

    return res.status(200)
      .json({ message: "Login successfully",  user: { ...otherDetails }, accessJwtToken: token} );
  } catch (error) {
    console.log(error);
  }
};




//--------------------------------------------------------------------

// Get user data from database using its id - PURPOSE: GET USER DATA AFTER LOGIN
const getUserById = async (id, res) => {
  const user = await UserSchema.findOne({ _id:id });

  !user && res.status(404).json({ message: "User not found" });
  const {_id, email, name, isAdmin, department, company, address, phone, dob, fullName  } = user
  
  try {
    return res.status(200)
      .json({ user: {_id, email, name, isAdmin, department, company, address, phone, dob, fullName } } );
  } catch (error) {
    console.log(error);
  }
}



//--------------------------------------------------------------------

// GET USERS BASED ON THEIR DEPARTMENT - PURPOSE: TO ASSIGN TICKET FOR USERS
const getAllAssignedUsers = async (req, res) => {
  
  try {

  const {department} = req.body;
  const findUsers = await UserSchema.find({department: department});

  const users = findUsers.map(user => {
    const {name, company, email, department} = user;
    return {name, company, email, department}; 
  })

  !users && res.status(404).json({ message: "User not found" });
  
  return res.status(200)
      .json({ users: users } );
  } catch (error) {
    console.log(error);
  }
}




//--------------------------------------------------------------------

// GET ALL USERS IN THE DB - PURPOSE: TO RENDER USERS FOR ADMIN.
const getAllUsers = async (req, res) => {

  const FindUsers = await UserSchema.find();

  !FindUsers && res.status(404).json({ message: "Users not found" });

  const users = FindUsers.map(user => {

    const {_id, name, email, department, company, isVerified, isAdmin } = user
    return {_id, name, email, department, company, isVerified, isAdmin}
  })
  
  try {
    return res.status(200)
      .json({users});
  } catch (error) {
    console.log(error);
  }
}


//--------------------------------------------------------------------

// Get a specific ticket  
const getUserDataByIdForEdit = async (paramId, clientId, res) =>{
  try {
    //find who is logged in
    const CurrentUser = await UserSchema.findOne ({_id: clientId})

    // console.log(paramId)
    const currentUserId = CurrentUser._id.toString() // in the mongodb the id is an object.
    
    //if user is and ADMIN
    if(CurrentUser.isAdmin || (currentUserId === paramId)){
      const findUser = await UserSchema.findOne({
        _id:paramId
        });
        !findUser && res.status(404).json({ message: "User not found" });

        const {name, company, address, phone, email, isVerified, isAdmin, department, id ,dob, fullName} = findUser
          
        return res.json({ status: "success", user: {name, company, address, phone, email, isVerified, isAdmin, department, id, dob, fullName} })
    }

    // //If any user wants to get his own page.
    // if(currentUserId === paramId){
    //   const {name, company, address, phone, email, isVerified, isAdmin, department, id ,dob, fullName} = CurrentUser
          
    //   return res.json({ status: "success", user: {name, company, address, phone, email, isVerified, isAdmin, department, id, dob, fullName} })
    // }



      res.status(404).json({ message: "You are not allowed to access User details" });
  }
  catch (error) {
      console.log(error);
      return (error);
  }
}



//--------------------------------------------------------------------


const EdiUserDataById = async ( req, res) =>{

  const {name, email, address, company, phone, department, isAdmin, isVerified, dob, fullName} = req.body;
  const clientId = req.userId;
  const { id } = req.params;

    try {

    //find who is logged in
    const CurrentUser = await UserSchema.findOne ({_id: clientId})
    const currentUserId = CurrentUser._id.toString() // in the mongodb the id is an object.
    
    if(CurrentUser.isAdmin || (currentUserId === id)){
      const findUser = await UserSchema.findOneAndUpdate(
        {
        _id: id
        },
        {
          $set:
          {
            name:name,
            email:email,
            address:address,
            company:company,
            department:department,
            phone:phone,
            isAdmin:isAdmin,
            isVerified:isVerified,
            dob: dob,
            fullName:fullName
          }
          },
          { new: true}
      );

        !findUser && res.status(404).json({ message: "User not found" });

        // const {name, company, address, phone, email, isVerified, isAdmin, department, id} = findUser
          
        return res.json({ status: "success", message:"User's profile is updated successfully", })
      }

      return res.status(404).json({ message: "You are not allowed to access User details" });


    }

catch (error) {
    console.log(error);
    return (error);
}
}



//--------------------------------------------------------------------





//Update user password
const updatePassword = async (res, email, newHashedPassword) => {

  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { email:email },
        {
          $set: { password: newHashedPassword },
        },
        { new: true }
      )
        .then((data) => resolve(data))
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

//--------------------------------------------------------------------


//Verify User
const verifyUser = async ( email, res) => {
    try {

        //first find User
        const findUser =  await UserSchema.findOne({
          $and: [{email:email}, {isVerified: false}],
      });


      const result =  await findUser.update(
        {
          $set: { isVerified: true },
        },
        { new: true }
      )

      console.log(findUser)
      
      if(findUser && findUser._id){
        return res.json({
          status : "success",
          message: "Your account has been verified, you may sign in now"
        })
      }

      return res.json ({
        status: "error",
        message: "Invalid request"
      })

    } catch (error) {
      console.log(error);
      return res.json({
        status: "error",
        message: "Invalid request!",
      });
    }
};



const deleteUser = async(req, res) => {
  try {
    const {id} = req.params
    const clientId = req.userId

     //find who is logged in
    const adminUser = await UserSchema.findOne ({_id: clientId})

    if(adminUser.isAdmin){
      const findUser = await UserSchema.findOneAndDelete(
        {
        _id: id
        },);


        return res.json({ status: "success", message:"User's profile is deleted successfully" })
      }
      return res.status(404).json({ message: "You are not allowed to access User details" });

  }catch (error){

  }
}




//--------------------------------------------------------------------

module.exports = { 
  createUser, 
  getUserByEmail,
  getUserById, 
  updatePassword,
  verifyUser,
  getAllUsers,
  getAllAssignedUsers,
  getUserDataByIdForEdit,
  EdiUserDataById,
  deleteUser,
  getDemoAdminUserByEmail,
  getDemoNonAdminUserByEmail
  
};

