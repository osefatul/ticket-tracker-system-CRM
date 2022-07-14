const userAuthorization = (req, res, next) => {
    const {authorization} = req.headers
    console.log(authorization)
 


    // 1. Verify if JWT is valid
    // 2. Check if JWT exists in redis database.
    // 3. Extract user id.
    // 4. Ger user profile based on the user_id


    res.json(403).json({message: "forbidden"})
    next()
}


module.exports = {userAuthorization}