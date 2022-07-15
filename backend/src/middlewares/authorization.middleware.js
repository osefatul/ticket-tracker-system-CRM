const {verifyAccessJWT} = require('../helpers/jwt.helper');
// const { getJWT } = require('../helpers/redis.helper');
const { client } = require("../helpers/redis.helper");

const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization)

    // 1. Verify if JWT is valid2
    const decoded = await verifyAccessJWT(authorization)
    console.log(decoded)

    if(decoded.email){

        const userId = await client.get(authorization, (error, res)=>{
            if(error) throw error
            return res
        })

        // const userId = await getJWT(authorization);

        if(!userId){
            return res.status(403).json({message: 'Forbidden'})
        }

        req.userId = userId;
        return next();
        
        
    }
    // 2. Check if JWT exists in redis database.
    // 3. Extract user id.
    // 4. Ger user profile based on the user_id


    res.json(403).json({message: "forbidden"})
    next()
}


module.exports = {userAuthorization}