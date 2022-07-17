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
    
    return {resetSavedObject} 
}

module.exports = {
    setPasswordResetPin
}