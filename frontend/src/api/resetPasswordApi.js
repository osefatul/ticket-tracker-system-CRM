import axios from "axios";

const rootUrl = "http://localhost:5000/v1/";
const otpReqUrl = rootUrl + "user/reset-password";
const updatePassUrl = rootUrl + "user/reset-password";



export const requestPasswordOTP = async (email) =>{

    try {
        const result = await axios.post(otpReqUrl, {email});
        console.log(result);
        return result.data;

    }catch(error){
        console.log(error);
        return error
    }
}


export const updateUserPassword = async passwordObject => {

    try {
        const result = await axios.patch (updatePassUrl, passwordObject);
        // console.log(result);
        return result.data

    }catch (error){
        console.log(error);
        return error
    }
}