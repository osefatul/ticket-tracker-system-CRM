const { UserSchema } = require("./User.schema");
const { TicketSchema } = require("../ticket/Ticket.schema");

const bcrypt = require("bcrypt");
const { emailProcessor } = require("../../helpers/email.helper");

const {
  createAccessJWT,
  createRefreshJWT,
} = require("../../helpers/jwt.helper");


//--------------------------------------------------------------------
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
    await emailProcessor({
			email,
			type: "new-user-confirmation-required",
			verificationLink: verificationURL + result._id + "/" + email,
		});
    

    console.log(result);
    res.status(200).json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
}
};


//--------------------------------------------------------------------

//
// Get user data from database using its email - PURPOSE: LOGIN
const getUserByEmail = async (req, res) => {
  
  const { email, password } = req.body;
  
  try {
  //Check if email exist
  const user = await UserSchema.findOne({ email });
  !user && res.status(404).json({ message: "User not found" });

  if(!user.isVerified){
    res.status(404).json({ message: "Please check your email for verification code..." });
  }

  //Check if password match
  const validPassword = await bcrypt.compare(password, user.password);
  !validPassword && res.status(404).json({ message: "Wrong Password" });

    //Redis storing JWT authentication credentials.
    const accessJwtToken = await createAccessJWT(email, `${user._id}`);
    const refreshJwtToken = await createRefreshJWT(email, `${user._id}`);

    return res.status(200)
      .json({ message: "Login successfully", accessJwtToken, refreshJwtToken } );
  } catch (error) {
    console.log(error);
  }
};


//--------------------------------------------------------------------

// Get user data from database using its id - PURPOSE: GET USER DATA AFTER LOGIN
const getUserById = async (id, res) => {
  const user = await UserSchema.findOne({ _id:id });

  !user && res.status(404).json({ message: "User not found" });
  const {_id, email, name, isAdmin, department, company } = user
  
  try {
    return res.status(200)
      .json({ user: {_id, email, name, isAdmin, department, company} } );
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
      const adminUser = await UserSchema.findOne ({_id: clientId})

      if(adminUser.isAdmin){
        const findUser = await UserSchema.findOne({
          _id:paramId
          });
          !findUser && res.status(404).json({ message: "User not found" });

          const {name, company, address, phone, email, isVerified, isAdmin, department, id} = findUser
            
          return res.json({ status: "success", user: {name, company, address, phone, email, isVerified, isAdmin, department, id}, })
      }

      res.status(404).json({ message: "You are not allowed to access User details" });
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

        //first find ticket
        const findTicket =  await UserSchema.findOne({
          $and: [{email:email}, {isVerified: false}],
      });


      const result =  await findTicket.update(
        {
          $set: { isVerified: true },
        },
        { new: true }
      )

      console.log(findTicket)
      
      if(findTicket && findTicket._id){
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

//--------------------------------------------------------------------

module.exports = { 
  createUser, 
  getUserByEmail,
  getUserById, 
  updatePassword,
  verifyUser,
  getAllUsers,
  getAllAssignedUsers,
  getUserDataByIdForEdit
};

