const { UserSchema } = require("./User.schema");
const bcrypt = require("bcrypt");
const {
  createAccessJWT,
  createRefreshJWT,
} = require("../../helpers/jwt.helper");

const createUser = async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;

  //Fill up all details in the inputs
  if (!name || !company || !address || !phone || !email || !password) {
    res
      .status(422)
      .json({ errors: [{ message: "Please fill up the details" }] });
  }

  // Check Password length
  if (password.length < 8) {
    return res.status(422).json({
      errors: [{ message: "Password should be or more than 8 characters" }],
    });
  }

  //Encrypt the password
  //number indicates more time to take to generated arandom string
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //check if email or phone alrady exists
  const userExist = await UserSchema.findOne({
    $or: [{ email: email }, { phone: phone }],
  });

  if (userExist) {
    return res
      .status(422)
      .json({ errors: [{ message: "User Already Exists" }] });
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
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmailnPassword = async (req, res) => {
  const { email, password } = req.body;
  //Check if email exist
  const user = await UserSchema.findOne({ email });
  !user && res.status(404).json({ message: "User not found" });

  //Check if password match
  const validPassword = await bcrypt.compare(password, user.password);

  !validPassword && res.status(404).json({ message: "Wrong Password" });

  try {
    //Pass parameters for JWT
    const accessJWT = await createAccessJWT(user.email, `${user._id}`);
    const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

    //Send everything except Password
    // const { password, ...others } = user._doc;

    res
      .status(200)
      .json({ message: "Login successfully", user, accessJWT, refreshJWT });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser, getUserByEmailnPassword };
