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
  //check if user exists
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
      password,
    });

    const result = await newUser.save();
    console.log(result);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createUser };
