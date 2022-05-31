const { UserSchema } = require("./User.schema");

const insertUser = (userObj) => {
  UserSchema(userObj)
    .save()
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

module.exports = { insertUser };
