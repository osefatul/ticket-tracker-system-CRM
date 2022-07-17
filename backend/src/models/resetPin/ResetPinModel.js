const { token } = require("morgan");
const { ResetPinSchema } = require("./ResetPinSchema");
const { randomPinNumber } = require("../../utils/randomGenerator");   

const setPasswordResetPin = async (email) => {
    
    const pinLength = 6;
    // const randPin = await randomPinNumber(pinLength);
    const randPin = "123456"

    const resetObject = {
        email, pin: randPin
    }

    const resetSavedObject = await new ResetPinSchema(resetObject).save()
    
    return {resetSavedObject} 
}

module.exports = {
    setPasswordResetPin
}