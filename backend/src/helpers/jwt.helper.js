const jwt = require("jsonwebtoken");
const { client } = require("./redis.helper");
const { UserSchema } = require("../models/user/User.schema");


// Creating JWT Access token and will be stored in the Redis database.
const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT =  jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1m", //change this to 15m
    });

     //Set key and value in the Redis.
     const setJWT = await client.set(accessJWT, _id, (err, data) => {
      if(err) throw err;
      return data
    })

    //return both values
    return {redis: setJWT, JwtAccess: accessJWT}
  } catch (error) {
    return error
  }
};


const storeUserRefreshJWT =  (_id, token) => {
  try {
    const storeRFtoken = UserSchema.findOneAndUpdate({_id},
      // $set operator will create a field if doesn't already exist .
      {$set: {"refreshJWT.token": token, 
      "refreshJWT.addedAt": Date.now()},
    },
    {new: true})
    return storeRFtoken 
  }
  catch(error) {
    console.log(error)
  return error
  }
}


//Creating JWT Refresh token This will be stored in the mongoDB database
const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });
    const stored = await storeUserRefreshJWT(_id ,refreshJWT);
    return {NewRefreshToken: refreshJWT, MDBstoredRefreshToken: stored}
  } catch (error) {
    return error
  }
};



const verifyAccessJWT = userJWT => {
  try {
    return jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET )
  } catch (error) {
    console.log(error)
    return error
  }
}



const verifyRefreshJWT = userJWT => {
  try {
    return jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET )
  } catch (error) {
    console.log(error)
    return error
  }
}




module.exports = { createAccessJWT, createRefreshJWT, verifyAccessJWT,verifyRefreshJWT };
