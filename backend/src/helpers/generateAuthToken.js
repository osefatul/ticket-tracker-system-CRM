const jwt = require("jsonwebtoken");

const generateAuthToken = (user) => {
const jwtSecretKey = process.env.JWT_ACCESS_SECRET;

const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    jwtSecretKey
);

return token;
};

module.exports = generateAuthToken;