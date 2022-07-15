const {verifyAccessJWT} = require('../helpers/jwt.helper');
const { client } = require("../helpers/redis.helper");

const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)

    // 1. Verify if JWT is valid
    const decoded = await verifyAccessJWT(authorization)
    console.log(decoded)

    //After decode of token if we have email then the code is valid.
    if(decoded.email){
    
    // 2. Check if JWT exists in redis database if yes Extract user id.
        const userId = await client.get(authorization, (error, res)=>{
            if(error) throw error
            return res})

        if(!userId){
            return res.status(403).json({message: 'Forbidden'})
        }

        req.userId = userId;
        return next();
    }

    //3. If key is either expired or invalid then delete it redis database
    await client.del(authorization)

    return res.json(403).json({message: "forbidden"})
}


module.exports = {userAuthorization}