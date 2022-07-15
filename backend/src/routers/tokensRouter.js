const express = require("express");
const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt.helper")
const { UserSchema } = require("../models/user/User.schema");

const router = express.Router();

//return refresh jwt
router.get("/new-access-jwt", async (req, res, next) => {

const {authorization} = req.headers
const decoded = await verifyRefreshJWT(authorization);
const email = decoded.email

if(email){

    //get user details
    const userProfile = await UserSchema.findOne({email});

    if(userProfile._id){
        let tokenExp = userProfile.refreshJWT.addedAt;
        const dBrefreshToken = userProfile.refreshJWT.token;

        //Adding + in front of string will convert it to a number.
        // Get expiration date and add 30days you will get token expiry date.
        tokenExp = tokenExp.setDate(tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY)

        const today = new Date();

        //if the expiry date is less than today, tokens aren't same then deny access, so the user must be logged in again to created refresh token.
        if(dBrefreshToken !== authorization && tokenExp < today){
            return res.status(403).json({message: 'Access denied'});
        }

        const accessJWT = await createAccessJWT(email, userProfile._id.toString())
        return res.json({status: "success", accessJWT})
    }
}
return res.status(403).json({message: "Access denied"});

});

module.exports = router;
