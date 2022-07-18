const { token } = require("morgan");
const { ResetPinSchema } = require("./ResetPinSchema");
const { randomPinNumber } = require("../../utils/randomGenerator");   


const setPasswordResetPin = async (email) => {    
    const pinLength = 6;
    const randPin = randomPinNumber(pinLength);
    
    const resetObject = {
        email,
        pin: randPin
    }
    const resetSavedObject = await new ResetPinSchema(resetObject).save()
    return resetSavedObject
}



const getPinByEmail = ( email, pin)=>{
    return new Promise((resolve, reject) => {
        try {
        ResetPinSchema.findOne({ email, pin }, (error, data) => {
            if (error) {
            console.log(error);
            resolve(false);
            }
    
            resolve(data);
        });
        } catch (error) {
        reject(error);
        console.log(error);
        }
    });
    };


//We are deleting pin code so the user cannot reset password again having same code.
const deletePin = (email, pin) => {
    try {
    ResetPinSchema.findOneAndDelete({ email, pin }, (error, data) => {
        if (error) {
        console.log(error);
        }
    });
    } catch (error) {
    console.log(error);
    }
};



module.exports = {
    setPasswordResetPin,
    getPinByEmail,
    deletePin
}