const { UserSchema } = require("./User.schema");
const bcrypt = require("bcrypt");

const {
  createAccessJWT,
  createRefreshJWT,
} = require("../../helpers/jwt.helper");


//--------------------------------------------------------------------


//Create a new user profile
const createUser = async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;

  //Fill up all details in the inputs
  if (!name || !company || !phone || !email || !password) {
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

  //Encrypt the password
  //number indicates more time to take to generated random string
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //Check if email or phone already exists
  const userExist = await UserSchema.findOne({
    $or: [{ email: email }, { phone: phone }],
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
      phone,
      email,
      password: hashPassword,
    });

    const result = await newUser.save();
    console.log(result);
    res.status(200).json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
  }
};




// Get user data from database using its email
const getUserByEmail = async (req, res) => {
  
  const { email, password } = req.body;
  
  try {
  //Check if email exist
  const user = await UserSchema.findOne({ email });
  !user && res.status(404).json({ message: "User not found" });

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




// Get user data from database using its id
const getUserById = async (id, res) => {
  const user = await UserSchema.findOne({ id });
  !user && res.status(404).json({ message: "User not found" });
  const {_id, email, name } = user
  
  try {
    return res.status(200)
      .json({ user: {_id, email, name} } );
  } catch (error) {
    console.log(error);
  }
}




//Update user password
const updatePassword = async (res, email, newHashedPassword) => {

  return new Promise((resolve, reject) => {
    try {
      UserSchema.findOneAndUpdate(
        { email },
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



module.exports = { 
  createUser, 
  getUserByEmail,
  getUserById, 
  updatePassword,
};

