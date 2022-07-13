const jwt = require("jsonwebtoken");
const { client } = require("./redis.helper");

const { UserSchema } = require("../models/user/User.schema");




const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT =  jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "15m", //change this to 15m
    });

     //Set key and value in the Redis.
     const setJWT = await client.set(accessJWT, _id, (err, data) => {
      if(err) throw err;
      return data
    })

    //return both values
    return {redis: setJWT, Jwt: accessJWT}
  } catch (error) {
    return error
  }
};




const storeUserRefreshJWT = (_id, token) => {
  try {
    const storeRFtoken = UserSchema.findOneAndUpdate({_id},
      {$set: {"refreshJWT.token": token, 
      "refreshJWT.addedAt": Date.now()},
    },
    {new: true}
    )
    return storeRFtoken 
  }
  catch(error) {
    console.log(error)
  return error
  }
}



const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    storeUserRefreshJWT(refreshJWT);
    const getJWT = await client.get(refreshJWT, (err, data) => {
      if(err) throw err;
      return data
    })

    return {GetRedisValue: getJWT}
  } catch (error) {
    return error
  }
};




module.exports = { createAccessJWT, createRefreshJWT };
