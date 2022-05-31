const { UserSchema } = require("./User.schema");

const insertUser = async (userObj, res) => {
  const { name, company, address, phone, email } = userObj;
  //Fill up all details in the inputs
  if (!name || !company || !address || !phone || !email) {
    res
      .status(422)
      .json({ errors: [{ message: "Please fill up the details" }] });
  }
  //check if user exists
  const userExist = await UserSchema.findOne({
    $or: [{ email: email }, { phone: phone }],
  });

  try {
    if (userExist) {
      res.status(422).json({ errors: [{ message: "User Already Exists" }] });
    }

    const result = await UserSchema(userObj);
    result.save();
    console.log(result);
    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { insertUser };
