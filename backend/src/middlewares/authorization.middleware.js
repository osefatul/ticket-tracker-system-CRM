const {verifyAccessJWT} = require('../helpers/jwt.helper');

const userAuthorization = async (req, res, next) => {
    const { authorization } = req.headers;
    // console.log(authorization)

    // 1. Verify if accessJWT is valid
    const decoded = await verifyAccessJWT(authorization)
    // console.log(decoded)

    //After decode of token if we have email then the code is valid.
    if(decoded.email){
    
        req.userId = decoded.userId;
        return next();
    }
}


module.exports = {userAuthorization}