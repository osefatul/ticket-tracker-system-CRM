const { UserSchema } = require("./User.schema");
const bcrypt = require("bcrypt");

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

module.exports = { createUser };
